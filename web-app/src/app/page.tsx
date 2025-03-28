function LogoChild() {
  return (
    <div className="logo-child">
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
    </div>
  );
}
export default function Home() {
  return (
    <div className="full-container">
      <div className="titor">
        <div className="avatar">
          <div className="icon-a"></div>
          <div className="icon-b"></div>
        </div>
        <div className="logo">
          <LogoChild />
          <LogoChild />
          <LogoChild />
          <LogoChild />
        </div>
        <div>quotes</div>
      </div>
      <div className="rito">
        b-page
      </div>
    </div>
  );
}
