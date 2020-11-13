// 用于测试用的二叉树

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
window._testTree = new TreeNode(2)
window._testTree.left = new TreeNode(3)
window._testTree.right = new TreeNode(5)
window._testTree.left.left = new TreeNode(9)
window._testTree.left.left.right = new TreeNode(7)

// =====================
//           2
//         /  \
//        3    5
//      /    
//      9
//       \
//        7
// =====================