import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          github pages 个人网站搭建
          github actions 自动构建React项目 发布到github pages上
        </p>
        <a
          className="App-link"
          href="https://1424518547.github.io/github-pages-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          github pages
        </a>
        <a
          className="App-link"
          href="https://1424518547.github.io/github-pages-demo/deploy-react-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          在GitHub Pages中快速部署React项目
        </a>
      </header>
    </div>
  );
}

export default App;
