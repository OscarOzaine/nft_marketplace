import desktopClasses from "./DesktopMenu.module.scss";

const DesktopMenu = (props) => {
  const { account } = props;

  // <Route path="/" element={
  //   <Home marketplace={marketplace} nft={nft} />
  // } />
  // <Route path="/create" element={
  //   <Create marketplace={marketplace} nft={nft} />
  // } />
  // <Route path="/my-listed-items" element={
  //   <MyListedItems marketplace={marketplace} nft={nft} account={account} />
  // } />
  // <Route path="/my-purchases" element={
  //   <MyPurchases marketplace={marketplace} nft={nft} account={account} />
  // } />

  if (account) {
    return (
      <ul className={desktopClasses.list}>
        <a href="/marketplace">
          <li>Marketplace</li>
        </a>
        <a href="/create">
          <li>Create</li>
        </a>
        <a href="/my-listed-items">
          <li>My Listed Items</li>
        </a>
        <a href="/my-purchases">
          <li>My Purchases</li>
        </a>
      </ul>
    );
  }

  return (
    <ul className={desktopClasses.list}>
      <a href="#">
        <li>Explore</li>
      </a>
      <a href="#">
        <li>Marketplace</li>
      </a>
    </ul>
  );
};

export default DesktopMenu;
