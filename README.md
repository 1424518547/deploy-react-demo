[https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
## GithubAction--React 项目发布到 GitHub Pages

1. 申请github密钥
这个示例需要将构建成果发到 GitHub 仓库，因此需要 GitHub 密钥。按照官方文档，生成一个密钥。然后，将这个密钥储存到当前仓库的Settings/Secrets里面。然后点击 New repository secret, 是储存秘密的环境变量的地方。环境变量的名字可以随便起，这里用的是ACCESS_TOKEN。如果你不用这个名字，后面脚本里的变量名也要跟着改。
2. 本地计算机使用create-react-app，生成一个标准的 React 应用。
```
$ npx create-react-app github-actions-demo
$ cd github-actions-demo
```
然后，打开package.json文件，加一个homepage字段，表示该应用发布后的根目录（参见官方文档）。
```
"homepage": "https://[username].github.io/github-actions-demo"
```
上面代码中，将[username]替换成你的 GitHub 用户名，参见范例。

3. 在这个仓库的.github/workflows目录，生成一个 workflow 文件，名字可以随便取，这个示例是ci.yml。

我们选用一个别人已经写好的 action：JamesIves/github-pages-deploy-action，它提供了 workflow 的范例文件，直接拷贝过来就行了（查看源码）。
```
name: GitHub Actions Build and Deploy Demo
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Build and Deploy
      uses: JamesIves/github-pages-deploy-action@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BRANCH: gh-pages
        FOLDER: build
        BUILD_SCRIPT: npm install && npm run build
```
上面这个 workflow 文件的要点如下。
```
整个流程在master分支发生push事件时触发。
只有一个job，运行在虚拟机环境ubuntu-latest。
第一步是获取源码，使用的 action 是actions/checkout。
第二步是构建和部署，使用的 action 是JamesIves/github-pages-deploy-action。
第二步需要四个环境变量，分别为 GitHub 密钥、发布分支、构建成果所在目录、构建脚本。其中，只有 GitHub 密钥是秘密变量，需要写在双括号里面，其他三个都可以直接写在文件里。
```

4. 保存上面的文件后，将整个仓库推送到 GitHub。

GitHub 发现了 workflow 文件以后，就会自动运行。
