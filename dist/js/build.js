(function (){
    function run(num1,num2){
        return num1+num2;
    }
    run(2,5)
    var arr = [2,4,5,6,7].map(function (item,index) {
        return item+20;
    });
    console.log(arr);
    var a = true;//"ture"
    a = parseInt(a);
    console.log(a);
    console.log(typeof a);
}
)();
(function (){
    function run(a,b){
        return a*b;
    }
    run(2,5);
    var arr = [2,4,5,6,7,23].map(function (item,index) {
        return item+20;
    });
    console.log(arr);

}
)()