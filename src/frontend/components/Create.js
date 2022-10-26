import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { Buffer } from 'buffer';
import { create as ipfsHttpClient } from 'ipfs-http-client'
import env from 'react-dotenv';

const projectId = process.env?.REACT_APP_IPFS_PROJECT_ID;
const projectSecret = process.env?.REACT_APP_IPFS_PROJECT_SECRET;
const ipfsSubdomain = process.env?.REACT_APP_IPFS_SUBDOMAIN;

// Pay attentnion at the space between Basic and the $ in the next line
// encrypt the authorization
const authorization = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString("base64")}`;

// with this next variable, you are passing the necessary information in the request to infura, notice authorization
// is being passed as argument headers
const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: authorization,
  },
});

const Create = ({ marketplace, nft }) => {
  console.log({env});
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== 'undefined') {
      try {
        const added = await client.add({ content: file });
        const URL = `${ipfsSubdomain}/ipfs/${added.path}`;
        console.log(URL);
        setImage(URL);
      } catch (error){
        console.log("ipfs image upload error: ", error);
      }
    }
  }

  const createNFT = async () => {
    console.log('create')
    console.log({
      image,
      price,
      name,
      description,
    })
    if (!image || !price || !name || !description) return
    try{
      console.log('create 1')
      const result = await client.add(JSON.stringify({image, price, name, description}));

      const uri = `${ipfsSubdomain}/ipfs/${result.path}`;

      console.log(uri);
      // mint nft 
      await(await nft.mint(uri)).wait();
      // get tokenId of new nft 
      const id = await nft.tokenCount();
      // approve marketplace to spend nft
      await(await nft.setApprovalForAll(marketplace.address, true)).wait();
      // add nft to marketplace
      const listingPrice = ethers.utils.parseEther(price.toString());
      await(await marketplace.makeItem(nft.address, id, listingPrice)).wait();
    } catch(error) {
      console.log("ipfs uri upload error: ", error);
    }
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Name"
              />
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                required
                as="textarea"
                placeholder="Description"
              />
              <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                size="lg"
                required
                type="number"
                placeholder="Price in ETH"
              />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create;
