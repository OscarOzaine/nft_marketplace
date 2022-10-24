import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Navigation from './Navigation/Navigation';
import Header from './Header/Header';
import Home from './Home.js'
import Create from './Create.js'
import MyListedItems from './MyListedItems.js'
import MyPurchases from './MyPurchases.js'
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import { useState } from 'react'
import { ethers } from 'ethers'
import { Spinner } from 'react-bootstrap'
import CategoryProvider from './../store/CategoryProvider';
import MainMarket from './Main/MainMarket';

import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState(null);
  const [marketplace, setMarketplace] = useState(null);

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });

    loadContracts(signer);
  }

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
    setMarketplace(marketplace);
    console.log({marketplace});
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    console.log('nft');
    console.log({nft});
    setNFT(nft);
    setLoading(false);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation
          web3Handler={web3Handler}
          account={account} 
        />
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <CategoryProvider>
                <MainMarket />
              </CategoryProvider>
            </>
            // <Home marketplace={marketplace} nft={nft} />
          } />
          <Route path="/create" element={
            <Create
              marketplace={marketplace}
              nft={nft}
            />
          } />
          <Route path="/my-listed-items" element={
            (marketplace && nft) && (
              <MyListedItems
                marketplace={marketplace}
                nft={nft}
                account={account} 
              />
            )
          } />
          <Route path="/my-purchases" element={
            <MyPurchases
              marketplace={marketplace}
              nft={nft}
              account={account}
            />
          } />
        </Routes>
        
        
        {/* 
        <CategoryProvider>
          <MainMarket />
        </CategoryProvider>
        <Offert />
        <Footer /> */}
      </div>
    </BrowserRouter>
  );

  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation
            web3Handler={web3Handler}
            account={account}
          />
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home marketplace={marketplace} nft={nft} />
              } />
              <Route path="/create" element={
                <Create marketplace={marketplace} nft={nft} />
              } />
              <Route path="/my-listed-items" element={
                <MyListedItems marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/my-purchases" element={
                <MyPurchases marketplace={marketplace} nft={nft} account={account} />
              } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
