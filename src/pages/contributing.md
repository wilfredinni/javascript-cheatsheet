---
title: 'Contributing - Javascript Cheatsheet'
description: The following is a set of guidelines for contributing to the Javascript Cheatsheet. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document.
date: June 09, 2018
updated: July 3, 2022
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Contributing
</base-title>

First off, thank you for taking the time to contribute!

The following is a set of guidelines for contributing to the Javascript Cheatsheet. These are mostly guidelines, not rules. Use your best judgment, and please don't hesitate to propose changes to [this document](https://github.com/wilfredinni/javascript-cheatsheet/blob/master/src/pages/contributing.md).

## Code of Conduct

This project and everyone who participates in it is governed by the [Contributor Covenant Code of Conduct](https://github.com/wilfredinni/javascript-cheatsheet/blob/master/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to services@github.com.

## Running the project locally

1.  Install the [pnpm](https://pnpm.io/installation) package manager

    On Linux/macOS:

        curl -fsSL https://get.pnpm.io/install.sh | sh -

    On Windows (PowerShell):

        iwr https://get.pnpm.io/install.ps1 -useb | iex

2.  Clone the project, and install the dependencies:

        git clone https://github.com/wilfredinni/javascript-cheatsheet.git
        cd javascript-cheatsheet
        pnpm install

3.  Create a new branch:

        git branch fix_bug
        git checkout fix_bug

4.  Change/upgrade/add the changes you want
5.  Update the `README` if needed
6.  `Add`, `commit` and `push` your changes to GitHub:

        git add .
        git commit -m 'succinct explanation of what changed'
        git push origin fix_bug

7.  Open a [pull request](https://github.com/wilfredinni/javascript-cheatsheet/pulls)

## You can:

- Submit changes to the cheatsheet
- Improve existing topics and examples
- Add new topics or resources
- Ask for new topics by creating an [Issue](https://github.com/wilfredinni/javascript-cheatsheet/issues)
- Read the issues, fork the project and do a [Pull Request](https://github.com/wilfredinni/javascript-cheatsheet/pulls)
- Report any kind of error or typo by creating an [Issue](https://github.com/wilfredinni/javascript-cheatsheet/issues) or fix it with a [Pull Request](https://github.com/wilfredinni/javascript-cheatsheet/pulls)

## What you need to know

If you don't know where to start:

- [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
- [Mastering Issues](https://guides.github.com/features/issues/)
- [Forking Projects](https://guides.github.com/activities/forking/)
- And read the rest of the [GitHub Guides](https://guides.github.com/)
