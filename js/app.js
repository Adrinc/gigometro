
window.onload = function() {

 openSpeedtestEngine();

};


var stopTest = false;
var SendData;
var myhostName = location.hostname;
var key;
var TestServerip;
var downloadSpeed;
var uploadSpeed;
var dataUsedfordl;
var dataUsedforul;
var pingEstimate;
var jitterEstimate;
var logData;
var return_data;
var ReQ = [];
var StartTime = [];
var CurrentTime = [];
var LiveSpeedArr;
var dLoaded = 0;
var uLoaded = 0;
var currentSpeed = 0;
var uploadTimeing;
var downloadTimeing;
var downloadTime;
var uploadTime;
var saveTestData;
var stop = 0;
var userAgentString;
var ulFinal = ulDuration * 0.6;
var dlFinal = dlDuration * 0.6;
var launch = true;
var init = true;
var OpenSpeedTestStart;
var SelectTest;

var fianlPingServer;
var statusPing;
var statusPingFinal;
var statusJitter;
var statusJitterFinal;
var statusPingTest;
var pingSendStatus = -1;
var finalPing = [];
var pingServer = [];
var finalJitter = [];
var pingSendLength = openSpeedTestServerList.length;

var Startit = 0;
var myname = "RTA";
var com = ".com";
var ost = myname;
var showResult = 0;
var uReQ = [];
var dLoad = 0;
var dDiff = 0;
var dTotal = 0;
var dtLoad = 0;
var dtDiff = 0;
var dtTotal = 0;
var dRest = 0;
var dReset;
var uReset;
var uLoad = 0;
var uDiff = 0;
var uTotal = 0;
var utLoad = 0;
var utDiff = 0;
var utTotal = 0;
var uRest = 0;
var dualReset;
var neXT = dlDuration * 1000 - 6000;
var dualupReset;
var neXTUp = ulDuration * 1000 - 6000;



function resetValues(){

  reSett();
  
  SendData = null;
  myhostName = location.hostname;
  key = null;
  TestServerip = null;
  downloadSpeed = 0;
  uploadSpeed = 0;
  dataUsedfordl = 0;
  dataUsedforul = 0;
  pingEstimate = 0;
  jitterEstimate = 0;
  logData = null;
  return_data = null;
  ReQ = [];
  StartTime = [];
  CurrentTime = [];
  LiveSpeedArr = null;
  dLoaded = 0;
  uLoaded = 0;
  currentSpeed = 0;
  uploadTimeing = null;
  downloadTimeing = null;
  downloadTime = null;
  uploadTime = null;
  saveTestData = null;
  stop = 0;
  userAgentString = null;
  ulFinal = ulDuration * 0.6;
  dlFinal = dlDuration * 0.6;
  launch = true;
  init = true;
  OpenSpeedTestStart = undefined;
  SelectTest = false;

  fianlPingServer = null;
  statusPing = null;
  statusPingFinal = null;
  statusJitter = null;
  statusJitterFinal = null;
  statusPingTest = null;
  pingSendStatus = -1;
  finalPing = [];
  pingServer = [];
  finalJitter = [];
  pingSendLength = openSpeedTestServerList.length;

  Startit = 0;
  myname = "RTA";
  com = ".com";
  ost = myname;
  showResult = 0;
  uReQ = [];
  dLoad = 0;
  dDiff = 0;
  dTotal = 0;
  dtLoad = 0;
  dtDiff = 0;
  dtTotal = 0;
  dRest = 0;
  dReset = null;
  uReset = null;
  uLoad = 0;
  uDiff = 0;
  uTotal = 0;
  utLoad = 0;
  utDiff = 0;
  utTotal = 0;
  uRest = 0;
  dualReset = null;
  neXT = dlDuration * 1000 - 6000;
  dualupReset = null;
  neXTUp = ulDuration * 1000 - 6000;

}

function sendPing() {
  readServerList();
}
function readServerList() {
  var Show = new openSpeedtestShow();
  pingSendLength = openSpeedTestServerList.length;
  Status = "Ping";
  performance.clearResourceTimings();
  if (pingSendStatus < pingSendLength - 1) {
    pingSendStatus++;
    if (statusPingTest != "Stop") {
      sendPingRequest(openSpeedTestServerList[pingSendStatus], readServerList, Show);
    }
  } else {
    if (pingServer.length >= 1) {
      var finalLeastPingResult = Math.min.apply(Math, finalPing);
      var finalLeastPingResultIndex = finalPing.indexOf(finalLeastPingResult);
      fianlPingServer = pingServer[finalLeastPingResultIndex];
      statusPingFinal = finalLeastPingResult;
      statusJitterFinal = finalJitter[finalLeastPingResultIndex];
      statusPingTest = "Busy";
      Show.LiveSpeed(statusPingFinal, "Ping");
      Show.pingResults(statusPingFinal, "Ping");
      Show.jitterResult(statusJitterFinal, "Jitter");
      pingEstimate = statusPingFinal;
      jitterEstimate = statusJitterFinal;
      if (SelectTest) {
        if (SelectTest == "Ping") {
          Status = "SendR";
        } else {
          Status = SelectTest;
        }
      } else {
        Status = "Download";
      }
    } else {
      if (pingServer.Download) {
      } else {
        Status = "Error";
      }
    }
  }


  function sendPingRequest(serverListElm, callback) {
    var pingSamplesSend = 0;
    var pingResult = [];
    var jitterResult = [];
    function sendNewPingReq() {
      if (pingSamplesSend < pingSamples) {
        pingSamplesSend++;
        if (statusPingTest != "Stop") {
          PingRequest();
        }
      } else {
        if (pingResult.length > 1) {
          jitterResult.sort(function(a, b) {
            return a - b;
          });
          jitterResult = jitterResult.slice(0, jitterResult.length * jitterFinalSample);
          jitterResult = jitterResult.reduce(function(acc, val) {
            return acc + val;
          }, 0) / jitterResult.length;
          var leastJitter = jitterResult.toFixed(1);
          var leastPing = Math.min.apply(Math, pingResult);
          finalPing.push(leastPing);
          pingServer.push(serverListElm);
          finalJitter.push(leastJitter);
          if (typeof callback === "function") {
            callback();
          }
        } else {
          if (typeof callback === "function") {
            callback();
          }
        }
      }
    }
    function PingRequest() {
      var Show = new openSpeedtestShow();
      var OST = new XMLHttpRequest();
      var ReQ = OST;
      if (statusPingTest != "Stop") {
        ReQ.abort();
      }
      ReQ.open(pingMethod, serverListElm[pingFile] + "?n=" + Math.random(), true);
      ReQ.timeout = pingTimeOut;
      var startTime = window.performance.now();
      ReQ.send();
      ReQ.onload = function() {
        if (this.status === 200 && this.readyState === 4) {
          var endTime = Math.floor(window.performance.now() - startTime);
          var perfNum = performance.getEntries();
          perfNum = perfNum[perfNum.length - 1];
          var perfPing;
          if (perfNum.initiatorType === "xmlhttprequest") {
            perfPing = parseFloat(perfNum.duration.toFixed(1));
          } else {
            perfPing = endTime;
          }
          if (pingSamplesSend > 250) {
            perfPing = endTime;
          }
          if (perfPing <= 0) {
            statusPing = 0.1;
            pingResult.push(0.1);
          } else {
            statusPing = perfPing;
            pingResult.push(perfPing);
          }
          if (pingResult.length > 1) {
            var jitterCalc = Math.abs(pingResult[pingResult.length - 1] - pingResult[pingResult.length - 2]).toFixed(1);
            jitterResult.push(parseFloat(jitterCalc));
            statusJitter = jitterCalc;
            Show.LiveSpeed(perfPing, "Ping");
            Show.pingResults(perfPing, "Ping");
            Show.jitterResult(jitterCalc, "Jitter");
          }
          sendNewPingReq();
        }
        if (this.status === 404 && this.readyState === 4) {
          pingSamplesSend++;
          sendNewPingReq();
        }
      };
      ReQ.onerror = function(e) {
        pingSamplesSend++;
        sendNewPingReq();
      };
      ReQ.ontimeout = function(e) {
        pingSamplesSend++;
        sendNewPingReq();
      };
    }
    PingRequest();
  }
  
}
function reportCurrentSpeed(now) {
  if (now === "dl") {
    var dTime = downloadTimeing * 1000;
    if (dTime > dReset * 1000 + dlFinal / 2 * 1000 && dRest === 0) {
      dRest = 1;
      dtTotal = dtTotal * 0.01;
      dTotal = dTotal * 0.01;
      dualReset = dTime + 10000;
    }
    if (dTime >= dualReset && dualReset < neXT) {
      dualReset += 10000;
      dtTotal = dtTotal * 0.01;
      dTotal = dTotal * 0.01;
    }
    dLoad = dLoaded <= 0 ? 0 : dLoaded - dDiff;
    dDiff = dLoaded;
    dTotal += dLoad;
    dtLoad = dtDiff = 0 ? 0 : dTime - dtDiff;
    dtDiff = dTime;
    dtTotal += dtLoad;
    if (dTotal > 0) {
      LiveSpeedArr = dTotal / dtTotal / 125 * upAdjust;
      currentSpeed = LiveSpeedArr;
    }
  }
  if (now === "up") {
    var Tym = uploadTimeing * 1000;
    if (Tym > uReset * 1000 + ulFinal / 2 * 1000 && uRest === 0) {
      uRest = 1;
      utTotal = utTotal * 0.1;
      uTotal = uTotal * 0.1;
      dualupReset = Tym + 10000;
    }
    if (Tym >= dualupReset && dualupReset < neXTUp) {
      dualupReset += 10000;
      utTotal = utTotal * 0.1;
      uTotal = uTotal * 0.1;
    }
    uLoad = uLoaded <= 0 ? 0 : uLoaded - uDiff;
    uDiff = uLoaded;
    uTotal += uLoad;
    utLoad = utDiff = 0 ? 0 : Tym - utDiff;
    utDiff = Tym;
    utTotal += utLoad;
    if (uTotal > 0) {
      LiveSpeedArr = uTotal / utTotal / 125 * upAdjust;
      currentSpeed = LiveSpeedArr;
    }
  }
}

function SendReQ(i) {
  try{

  
  var lastLoaded = 0;
  var OST = new XMLHttpRequest();
  ReQ[i] = OST;
  ReQ[i].open("GET", fianlPingServer.Download + "?n=" + Math.random(), true);
  ReQ[i].onprogress = function(e) {
    if (stop === 1) {
      ReQ[i].abort();
      ReQ[i] = null;
      ReQ[i] = undefined;
      delete ReQ[i];
      return false;
    }
    if (Status == "initDown") {
      Status = "Downloading";
    }
    var eLoaded = e.loaded <= 0 ? 0 : e.loaded - lastLoaded;
    if (isNaN(eLoaded) || !isFinite(eLoaded) || eLoaded < 0) {
      return false;
    }
    dLoaded += eLoaded;
    lastLoaded = e.loaded;
  };
  ReQ[i].onload = function(e) {
    if (lastLoaded === 0) {
      dLoaded += e.total;
    }
    if (Status == "initDown") {
      Status = "Downloading";
    }
    if (ReQ[i]) {
      ReQ[i].abort();
      ReQ[i] = null;
      ReQ[i] = undefined;
      delete ReQ[i];
    }
    if (stop === 0) {
      SendReQ(i);
    }
  };
  ReQ[i].onerror = function(e) {
    if (stop === 0) {
      SendReQ(i);
    }
  };
  ReQ[i].responseType = "arraybuffer";
  ReQ[i].send();
}catch(e){ return;}
}


var ServerConnect = function(auth) {
  var Show = new openSpeedtestShow();
  var Self = this;
  var xhr = new XMLHttpRequest();
  var url = OpenSpeedTestdb;
  if (auth == 1) {
    url = webIP;
  }
  if (auth == 5) {
    url = saveDataURL;
  }
  if (auth == 7) {
    url = get_IP;
  }
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      return_data = xhr.responseText.trim();
      if (auth == 2) {
        key = return_data;
      }
      if (auth == 1) {
        TestServerip = return_data;
      }
      if (auth == 3) {
        setTimeout(function() {
          location.href = showResult + return_data;
        }, 1500);
      }
      if (auth == 6) {
        openSpeedTestServerList = JSON.parse(return_data);
        launch = true;
        runTasks();
      }
      if (auth == 7) {
        Show.YourIP.el.textContent = return_data;
      }
    }
  };
  if (auth == 2) {
    logData = "r=n";
  }
  if (auth == 3) {
    logData = "r=l" + "&d=" + downloadSpeed + "&u=" + uploadSpeed + "&dd=" + dataUsedfordl / 1048576 + "&ud=" + dataUsedforul / 1048576 + "&p=" + pingEstimate + "&do=" + myhostName + "&S=" + key + "&sip=" + TestServerip + "&jit=" + jitterEstimate + "&ua=" + userAgentString;
  }
  if (auth == 5) {
    logData = saveTestData;
  }
  if (auth == 6) {
    logData = "r=s";
  }
  xhr.send(logData);
};


function OpenSpeedtest() {
  var Show = new openSpeedtestShow();
  var Get = new openSpeedtestGet();
  if (openChannel === "widget" || openChannel === "web") {
    ServerConnect(1);
  }
  function readyToUP() {
    uploadTime = window.performance.now();
    upReq();
  }
  var Engine = setInterval(function() {
    if (Status === "Loaded") {
      Status = "busy";
      sendPing(0);
    }
    if (Status === "Ping") {
      Status = "busy";
      Show.showStatus("Milliseconds");
    }
    if (Status === "Download") {
      Show.showStatus("Initializing..");
      Get.reset();
      reSett();
      Show.reset();
      downloadTime = window.performance.now();
      downReq();
      Status = "initDown";
    }
    if (Status === "Downloading") {
      Show.Symbol(0);
      if (Startit == 0) {
        Startit = 1;
        Show.showStatus("Testing download speed..");
        var extraTime = (window.performance.now() - downloadTime) / 1000;
        dReset = extraTime;
        Show.progress(1, dlDuration + 2.5);
        dlDuration += extraTime;
      }
      downloadTimeing = (window.performance.now() - downloadTime) / 1000;
      reportCurrentSpeed("dl");
      Show.showStatus("Gbps download");
      Show.LiveSpeed(currentSpeed/1000);

      downloadSpeed = Get.AvgSpeed(currentSpeed, dlFinal, dlDuration);
      if (downloadTimeing >= dlDuration && ProG == "done") {
        if (SelectTest) {
          Show.GaugeProgresstoZero(currentSpeed/1000, "SendR");
          Show.showStatus("All done download");
          Show.Symbol(2);
        } else {
          Show.GaugeProgresstoZero(currentSpeed/1000, "Upload");
        }
        Show.downloadResult(downloadSpeed/1000); // <-- aqui se muestra el resultado de la prueba de velocidad reducido de Mb/s a Gb/s
        dataUsedfordl = dLoaded;
        stop = 1;
        Status = "busy";
        reSett();
        Get.reset();
      }
    }
    if (Status == "Upload") {
      if (stop === 1) {
        Show.Symbol(1);
        Status = "initup";
        Show.showStatus("Initializing..");
        Show.LiveSpeed("0", "speedToZero");
        SendData = Get.uRandom(ulDataSize, readyToUP);
        if (SelectTest) {
          Startit = 1;
        }
      }
    }
    if (Status === "Uploading") {
      if (Startit == 1) {
        Startit = 2;
        Show.showStatus("Testing upload speed..");
        currentSpeed = 0;
        Get.reset();
        Show.reset();
        var extraUTime = (window.performance.now() - uploadTime) / 1000;
        uReset = extraUTime;
        Show.progress(false, ulDuration + 2.5);
        ulDuration += extraUTime;
      }
      Show.showStatus("Gbps upload");
      uploadTimeing = (window.performance.now() - uploadTime) / 1000;
      reportCurrentSpeed("up");
      Show.LiveSpeed(currentSpeed/1000);
  
      uploadSpeed = Get.AvgSpeed(currentSpeed, ulFinal, ulDuration);
      if (uploadTimeing >= ulDuration && stop == 1) {
        dataUsedforul = uLoaded;
        Show.uploadResult(uploadSpeed/1000); //Convertir Mbps a Gbps
        Show.GaugeProgresstoZero(currentSpeed/1000, "SendR");
        SendData = undefined;
        Show.showStatus("All done upload");
        Show.Symbol(2);
        Status = "busy";
        stop = 0;
        resetAnimation();
      }
    }
    if (Status === "Error") {
      Show.showStatus("Check your network connection status.");
      Show.ConnectionError();
      Status = "busy";
      clearInterval(Engine);

      Show.oDoLiveSpeed.el.textContent = "Network Error";
    }
    if (Status === "SendR") {
      try{

   
      Show.showStatus("Termine: Status SendR");
      Show.oDoLiveSpeed.el.textContent = ost;
      if (location.hostname != myname.toLowerCase() + com) {
        saveTestData = "https://" + myname.toLowerCase() + com + "/results/show.php?" + "&d=" + downloadSpeed.toFixed(3) + "&u=" + uploadSpeed.toFixed(3) + "&p=" + pingEstimate + "&j=" + jitterEstimate + "&dd=" + (dataUsedfordl / 1048576).toFixed(3) + "&ud=" + (dataUsedforul / 1048576).toFixed(3) + "&ua=" + userAgentString;
        saveTestData = encodeURI(saveTestData);

        if (saveData) {
          ServerConnect(5);
        }
      } else {
        ServerConnect(3);
      }
      Status = "busy";
      Show.reset();
      Get.reset();
      reSett();
      clearInterval(Engine);
      console.log("Termino: Reseteado");
    }catch(e){return;}
    }
  }, 100);


  function downReq() {
    for (var i = 0; i < dlThreads; i++) {
      setTimeout(function(i) {
        SendReQ(i);
      }, dlDelay * i, i);
    }
  }
  function upReq() {
    for (var i = 0; i < ulThreads; i++) {
      setTimeout(function(i) {
        SendUpReq(i);
      }, ulDelay * i, i);
    }
  }
}

function SendUpReq(i) {
  var lastULoaded = 0;
  var OST = new XMLHttpRequest();
  uReQ[i] = OST;
  uReQ[i].open("POST", fianlPingServer.Upload + "?n=" + Math.random(), true);
  uReQ[i].upload.onprogress = function(e) {
    if (Status == "initup" && some === undefined) {
      var some;
      Status = "Uploading";
    }
    if (uploadTimeing >= ulDuration) {
      uReQ[i].abort();
      uReQ[i] = null;
      uReQ[i] = undefined;
      delete uReQ[i];
      return false;
    }
    var eLoaded = e.loaded <= 0 ? 0 : e.loaded - lastULoaded;
    if (isNaN(eLoaded) || !isFinite(eLoaded) || eLoaded < 0) {
      return false;
    }
    uLoaded += eLoaded;
    lastULoaded = e.loaded;
  };
  uReQ[i].onload = function() {
    if (lastULoaded === 0) {
      uLoaded += ulDataSize * 1048576;
      if (uploadTimeing >= ulDuration) {
        uReQ[i].abort();
        uReQ[i] = null;
        uReQ[i] = undefined;
        delete uReQ[i];
        return false;
      }
    }
    if (Status == "initup" && some === undefined) {
      var some;
      Status = "Uploading";
    }
    if (uReQ[i]) {
      uReQ[i].abort();
      uReQ[i] = null;
      uReQ[i] = undefined;
      delete uReQ[i];
    }
    if (stop === 1) {
      SendUpReq(i);
    }
  };
  uReQ[i].onerror = function(e) {
    if (uploadTimeing <= ulDuration) {
      SendUpReq(i);
    }
  };
  uReQ[i].setRequestHeader("Content-Type", "application/octet-stream");
  if (i > 0 && uLoaded <= 17000) {
  } else {
    try{
    uReQ[i].send(SendData);
    }
    catch(e){confirm("Error al enviar datos");}
  }
}
function testRun() {
  var Show = new openSpeedtestShow();
      if (init) {
        Show.ShowUI();
        init = false;
      }
      OpenSpeedtest();}



function reSett() {
  StartTime = 0;
  CurrentTime = 0;
  LiveSpeedArr = 0;
  currentSpeed = 0;
}

function setFinal() {
  if (ulDuration * 0.6 >= 7) {
    ulFinal = 7;
  }
  if (dlDuration * 0.6 >= 7) {
    dlFinal = 7;
  }
}

function runTasks() {
  var Show = new openSpeedtestShow();
  console.log(stopTest);
  if (stopTest==true){
    console.log("detenido");
    return;
  }else{

 
      console.log("runTasks");
      console.log(OpenSpeedTestStart);

      if (OpenSpeedTestStart >= 0) {
        console.log("OpenSpeedTestStart");
        launch = false;
        Show.ShowUI();
        init = false;
        var AutoTme = Math.ceil(Math.abs(OpenSpeedTestStart));
        Show.showStatus("Automatic Test Starts in ...");
        var autoTest = setInterval(countDownF, 1000);
      }
      function countDownF() {
        console.log("countDownF");
        if (AutoTme >= 1) {
          console.log("AutoTme >= 1");
          AutoTme = AutoTme - 1;
          Show.LiveSpeed(AutoTme, "countDown");
        } else {
          if (AutoTme <= 0) {
            console.log("AutoTme <= 0");
            console.log(autoTest);
            clearInterval(autoTest);
            launch = true;
            OpenSpeedTestStart = undefined;
            runTasks();
          }
        }
      }
      console.log(openSpeedTestServerList);
      console.log("launch: "+launch);
      if (openSpeedTestServerList === "fetch" && launch === true) {
        launch = false;
        Show.showStatus("Fetching Server Info..");
        ServerConnect(6);
      }
      if (launch === true) {
        console.log("launch === true");
        console.log(SelectTest);
        if (SelectTest === "Ping") {
          testRun();
        } else if (SelectTest === "Download") {
          testRun();
        } else if (SelectTest === "Upload") {
          testRun();
        } else if (SelectTest === false) {
          testRun();
        }
      }
    }
    }






   function openSpeedtestEngine(){
    
    var Show = new openSpeedtestShow();
    Show.app();
    reSett();
    if (window.navigator.userAgent) {userAgentString = window.navigator.userAgent;} else {userAgentString = "Not Found";}
    setFinal();



    var getParams = function(url) {
      var params = {};
      var parser = document.createElement("a");
      parser.href = url;
      var query = parser.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        params[pair[0]] = decodeURIComponent(pair[1]);
      }
      return params;
    };
    var getCommand = getParams(window.location.href.toLowerCase());
    if (setPingSamples) {
      if (typeof getCommand.ping === "string" || typeof getCommand.p === "string") {
        var setPing;
        if (typeof getCommand.ping !== "undefined") {
          setPing = getCommand.ping;
        } else if (typeof getCommand.p !== "undefined") {
          setPing = getCommand.p;
        }
        if (setPing > 0) {
          pingSamples = setPing;
          pingSamples = setPing;
        }
      }
    }
    if (setPingTimeout) {
      if (typeof getCommand.out === "string" || typeof getCommand.o === "string") {
        var setOut;
        if (typeof getCommand.out !== "undefined") {
          setOut = getCommand.out;
        } else if (typeof getCommand.o !== "undefined") {
          setOut = getCommand.o;
        }
        if (setOut > 1) {
          pingTimeOut = setOut;
          pingTimeOut = setOut;
        }
      }
    }
    if (setHTTPReq) {
      if (typeof getCommand.xhr === "string" || typeof getCommand.x === "string") {
        var setThreads;
        if (typeof getCommand.xhr !== "undefined") {
          setThreads = getCommand.xhr;
        } else if (typeof getCommand.x !== "undefined") {
          setThreads = getCommand.x;
        }
        if (setThreads > 0 && setThreads <= 32) {
          dlThreads = setThreads;
          ulThreads = setThreads;
        }
      }
    }
    function isValidHttpUrl(str) {
      var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if (!regex.test(str)) {
        return false;
      } else {
        return true;
      }
    }
    if (selectServer) {
      if (typeof getCommand.host === "string" || typeof getCommand.h === "string") {
        var severAddress;
        if (typeof getCommand.host !== "undefined") {
          severAddress = getCommand.host;
        } else if (typeof getCommand.h !== "undefined") {
          severAddress = getCommand.h;
        }
        if (isValidHttpUrl(severAddress)) {
          openSpeedTestServerList = [{ServerName:"Home", Download:severAddress + "/downloading", Upload:severAddress + "/upload", ServerIcon:"DefaultIcon",},];
        }
      }
    }
    var custom = parseInt(getCommand.stress);
    var customS = parseInt(getCommand.s);
    var runStress;
    var runStressCustom;
    if (typeof getCommand.stress === "string") {
      runStress = getCommand.stress;
      runStressCustom = custom;
    } else if (typeof getCommand.s === "string") {
      runStress = getCommand.s;
      runStressCustom = customS;
    }
    if (runStress && stressTest) {
      if (runStress === "low" || runStress === "l") {
        dlDuration = 300;
        ulDuration = 300;
      }
      if (runStress === "medium" || runStress === "m") {
        dlDuration = 600;
        ulDuration = 600;
      }
      if (runStress === "high" || runStress === "h") {
        dlDuration = 900;
        ulDuration = 900;
      }
      if (runStress === "veryhigh" || runStress === "v") {
        dlDuration = 1800;
        ulDuration = 1800;
      }
      if (runStress === "extreme" || runStress === "e") {
        dlDuration = 3600;
        ulDuration = 3600;
      }
      if (runStress === "day" || runStress === "d") {
        dlDuration = 86400;
        ulDuration = 86400;
      }
      if (runStress === "year" || runStress === "y") {
        dlDuration = 31557600;
        ulDuration = 31557600;
      }
      if (custom > 12 || customS > 12) {
        dlDuration = runStressCustom;
        ulDuration = runStressCustom;
      }
    }
    var overheadClean = parseInt(getCommand.clean);
    var overheadCleanC = parseInt(getCommand.c);
    var customOverHeadValue = 1;
    if (overheadClean) {
      customOverHeadValue = overheadClean;
    } else if (overheadCleanC) {
      customOverHeadValue = overheadCleanC;
    }
    if (enableClean) {
      if (typeof getCommand.clean === "string" || typeof getCommand.c === "string") {
        if (overheadClean >= 1 || overheadCleanC >= 1) {
          if (overheadClean < 5 || overheadCleanC < 5) {
            upAdjust = 1 + customOverHeadValue / 100;
            dlAdjust = 1 + customOverHeadValue / 100;
          }
        } else {
          upAdjust = 1;
          dlAdjust = 1;
        }
      }
    }
    var OpenSpeedTestRun = parseInt(getCommand.run);
    var OpenSpeedTestRunR = parseInt(getCommand.r);

    if (enableRun) {
      if (typeof getCommand.run === "string" || typeof getCommand.r === "string") {
        if (OpenSpeedTestRun > 0) {
          OpenSpeedTestStart = OpenSpeedTestRun;
        } else if (OpenSpeedTestRunR > 0) {
          OpenSpeedTestStart = OpenSpeedTestRunR;
        } else {
          OpenSpeedTestStart = 0;
        }
      }
    }
    if (OpenSpeedTestStart >= 0) {
      if (launch) {
        runTasks();
      }
    }
    var runTest = getCommand.test;
    var runTestT = getCommand.t;
    SelectTest = false;
    if (selectTest) {

      if (typeof runTest === "string" || typeof runTestT === "string") {
        var runTestC;
        if (runTest) {
          runTestC = runTest;
          SelectTest = runTest;
        } else if (runTestT) {
          runTestC = runTestT;
          SelectTest = runTestT;
        }
        if (runTestC === "download" || runTestC === "d") {
          uploadSpeed = 0;
          dataUsedforul = 0;
          SelectTest = "Download";
          if (launch) {
            runTasks();
          }
        } else if (runTestC === "upload" || runTestC === "u") {
          downloadSpeed = 0;
          dataUsedfordl = 0;
          SelectTest = "Upload";
          stop = 1;
          if (launch) {
            runTasks();
          }
        } else if (runTestC === "ping" || runTestC === "p") {
          uploadSpeed = 0;
          dataUsedforul = 0;
          downloadSpeed = 0;
          dataUsedfordl = 0;
          SelectTest = "Ping";
          if (launch) {
            runTasks();
          }
        } else {
          SelectTest = false;
        }
      }
    }
 

    if (openChannel === "web") {
      showResult = webRe;
      requestIP = true;
    }
    if (openChannel === "widget") {
      showResult = widgetRe;
      requestIP = true;
    }
    if (openChannel === "selfwidget") {
      showResult = widgetRe;
      TestServerip = domainx;
      myhostName = TestServerip;
    }
    if (openChannel === "dev") {
    }

    OpenSpeedtest();

  }

function stopall(){
  console.log("stopAll");
  stopTest = true;
  var Show = new openSpeedtestShow();
  Show.GaugeProgresstoZero(0, "SendR");
  resetValues();
  resetVisuals();
  resetAnimation();
  runTasks();
}
function start(){
  stopTest = false;
  resetValues();
  resetVisuals();
  runTasks();
}
function resetAnimation(){
  carAnimation.pause();
  carAnimation.progress(1);
}
function resetVisuals(){
  var Show = new openSpeedtestShow();
  var Get = new openSpeedtestGet();
  Show.showStatus("");
  Show.uploadResult(0);
  Show.pingResults(0);
  Show.downloadResult(0);

  Get.reset();
  Show.reset();
  hideArrows();

}
  