function Header({ text }: { text: string }) {
  return (
    <header>
      <div className="container">
        <h2>{text}</h2>  
      </div>
    </header>
  );
}

export default Header;
