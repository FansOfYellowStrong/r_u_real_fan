#!/usr/bin/env node

const readlineSync = require('readline-sync');
const colors = require('colors');
const data = require('./lib/data');

let errorCount = 0;

/**
 * 校验方法
 * @param {string} choosed 你特么自己选择的答案
 * @param {string} anwser 这是最标准的答案
 */
function validate(choosed, anwser) {
  if (choosed.length != anwser.length) {
    return false;
  }
  choosed = choosed.toUpperCase().split('').sort().join('');
  anwser = anwser.toUpperCase().split('').sort().join('');
  return choosed === anwser;
}

/**
 * 获取结果
 */
function levelAchievement() {
  if (errorCount < 1) {
    return `「${colors.yellow('强粉')}」，正确率：${colors.red('100%')}，不愧是强神的真粉丝👍`;
  }
  const ratio = Math.ceil((1 - (errorCount/data.length)) * 100);
  return `「路人」，正确率：${colors.red(ratio + '%')}，强神没你这个粉丝！😑`;
}

console.log(`现在市面上太多 ${colors.red('强神的假粉丝')}，真正的粉丝闭着眼睛也能完成下面的题！🎓`);
console.log(colors.rainbow('- 有些题目是多选!'));
console.log(colors.green('- 目前已收录了 ') + colors.yellow(data.length) + colors.green(' 道强问\n'));

let i = 0;
while (i < data.length) {
  const item = data[i];
  // construct options 
  let options = '';
  Object.keys(item.o).map(key => {
    options += `${key.toUpperCase()}: ${item.o[key]}\n`;
  });

  const choosed = readlineSync.question(`${i+1}.${item.q}\n${options}`);

  if (!validate(choosed, item.a)) {
    errorCount++;
  }
  i++;
}

console.log('你被授予:' + levelAchievement());
