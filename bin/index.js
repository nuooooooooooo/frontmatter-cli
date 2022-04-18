#! /usr/bin/env node
const fs = require('fs');
const filePath = './test2.md';
const frontMatter = `---
setup: |
  import xxx from '../../layouts/xxx.astro'
  import xxx from '../../components/xxx.astro'
title: My post title
date: ${new Date().toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"long", day:"numeric"}) }
author: Your Name
tags: ['first','second']
description: This is my blogpost description
---
# My post title
`
console.log(frontMatter)

fs.writeFile(filePath,frontMatter,{ flag: 'ax' },  (err) => {
    if (err) {
        console.error(err)
        return
    }
})

