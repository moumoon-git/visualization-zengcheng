import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
export default function bigImg () {
  //初始化 viewerjs
  const ViewerDom = document.querySelectorAll(".BigImg");
  ViewerDom.forEach(item=>{
    const viewer = new Viewer(item, {
      url: "data-original"
    });
  })
}
