
var nodeD = {
    val: 4,
    next: null
}

var nodeC = {
    val: 3,
    next: nodeD
}

var nodeB = {
    val: 2,
    next: nodeC
}

var nodeA = {
    val: 1,
    next: nodeB
}

function reverseLinkedList (head){
    let node = head;
    let previous;  
    let reverse = null; 
    while (node.next){
       previous = node;
       node = node.next; 
       previous.next = reverse; 
       reverse = previous; 

    }
    node.next = reverse; 
}
reverseLinkedList(nodeA); 

console.log(nodeD.next);
 


