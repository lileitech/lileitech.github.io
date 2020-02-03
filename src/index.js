import './style/index.css';

function main() {
  function $(selector) {
    return document.querySelector(selector);
  }

  var extractFaceEL = $('#extractFace');
  var extractBodyEL = $('#extractBody')
  var maskEL = $('#mask')
  var imageViewerEL = $('#imageViewer')
  var imageViewerImgEL = $('#imageViewerImg')
  var mainEL = $('#main')
  var mainOuterEL = $('#mainOuter')
  var extractInfoEL = $('#extractInfo')
  var isShowDialog = false
  var pageNum = 0
  var detailEL = $('#detail')
  var contentEL = $('#content')
  var moreBtnOuterEL = $('#moreBtnOuter')

  function showDetail() {
    if (pageNum != 0 || isShowDialog) return
    mainEL.className = 'main main--blur'
    extractInfoEL.className = 'extract-info extract-info--small'
    extractFaceEL.className = 'extract_face extract_face--small'
    extractBodyEL.className = 'extract_body extract_body--more'
    moreBtnOuterEL.className = "more-btn-outer more-btn-outer--hidden"
    contentEL.className = 'content content--more'
    detailEL.className = 'detail detail--show'
    pageNum = !pageNum
  }

  function clearDialog() {
    imageViewerEL.style.display = 'none'
    maskEL.style.display = 'none'
    isShowDialog = false
  }

  function maskTrigger(isShow, params) {
    maskEL.style.display = isShow ? 'block' : 'none'
  }
  function popImagViwer(img, params) {
    // TODO img 可处理对象字符串，可加参数params
    maskTrigger(true);
    isShowDialog = true;
    imageViewerEL.style.display = 'block';
    imageViewerImgEL.src = img;
  }
  function handleFaceClick(event) {
    event.stopPropagation();
    var img = window.getComputedStyle(event.target, null).backgroundImage;
    img = img.replace(/([u,U][r,R][l,L]\("?)([^"]*)"?\)/, '$2')
    popImagViwer(img)
  }

  maskEL.addEventListener('click', clearDialog)
  document.addEventListener('keydown', showDetail)
  mainOuterEL.addEventListener('click', showDetail)
  extractFaceEL.addEventListener('click', handleFaceClick)
  extractFaceEL.addEventListener('touch', clearDialog)

}
document.addEventListener('DOMContentLoaded', main)