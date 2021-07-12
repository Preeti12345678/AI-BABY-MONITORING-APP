objects=[];
status="";
img="";
function preload(){
    alarm=loadSound("alarm.wav");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.position(450,150);
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status= Detecting baby";
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}
function gotResults(error,results){
    if(error){
      console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video,0,0,500,400);
    if(status !=""){
        object_detector.detect(video, gotResults);
    for(i=0; i<objects.length; i++){
        if(objects[0].label==person){
            document.getElementById("status").innerHTML="Status= Detected baby"; 
            alarm.stop();
        }
        else{
            document.getElementById("status").innerHTML="Status= Baby not detected";
            alarm.play();
        }
    }
    if(objects.length<=0){
        document.getElementById("status").innerHTML="Status= Baby not detected";
        alarm.play();
    }
}
}





