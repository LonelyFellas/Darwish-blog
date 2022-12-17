import { Label } from '../types';
import { randomID } from './randomID';

/**
 *
 * @param domLoopID: 此id下添加节点
 * @param label: 添加的标签元素名称
 * @param domLoopData: 循环添加的数据源
 * @param thisEnv: 当前环境
 */
const domLoop: <T extends any[]>({
  domLoopID,
  label,
  domLoopData,
  thisEnv,
}: {
  domLoopID: string;
  label: Label;
  domLoopData: T;
  thisEnv: ShadowRoot;
}) => void = ({ domLoopID, label, domLoopData, thisEnv }) => {
  const dom = thisEnv?.querySelector(`#${domLoopID}`); // 查找需要添加哪个节点下
  for (let i = 0; i < domLoopData.length; i++) {
    const createElement = document.createElement(label);
    createElement.textContent = domLoopData[i];
    createElement.classList.add('nav-link')
    createElement.id = `${domLoopID}_child${i}_${randomID()}`; // 给每个节点添加唯一ID
    dom?.appendChild(createElement.cloneNode(true)); // 添加
  }
};

export default domLoop;
