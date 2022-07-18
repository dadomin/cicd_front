const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3787;

const bodyParser = require('body-parser');
const { response } = require("express");
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended : true,
  })
)

const url = "http://ec2-15-165-203-164.ap-northeast-2.compute.amazonaws.com:8000";

const exeTstDep = async (request) => {
    const {project_id, target_branch, mr_id, version} = request.body;
    let response
    try {
        response = await axios.post(`${url}/mr/deploy`, {
            project_id : project_id,
            target_branch : target_branch,
            mr_id : mr_id,
            version : version
        })
    } catch(e) {
        console.log(e)
    }
    return response
}

const exeMrCreate = async (request) => {
    const {project_name, source_branch, target_branch, title, describe} = request.body;
    let response
    try {
        response  = await axios.post(`${url}/mr/create`, {
            project_name : project_name,
            source_branch : source_branch,
            target_branch : target_branch,
            title : title,
            describe : describe
        })
    } catch (error) {
        console.log(error)
    }
    return response
}

const mrApprove = async (request) => {
    const {project_id, target_branch, mr_id} = request.body;
    let response
    try {
        response = await axios.post(`${url}/mr/approve`, {
            project_id : project_id,
            target_branch : target_branch,
            mr_id : mr_id
        })
    } catch (error) {
        console.log(error)
    }
    return response
}

const mrReject = async (request) => {
    const {project_id, target_branch, mr_id} = request.body;
    let response
    try {
        response = await axios.post(`${url}/mr/reject`, {
            project_id : project_id,
            target_branch : target_branch,
            mr_id : mr_id
        })
    } catch (error) {
        console.log(error)
    }
    return response
}

// 배포
app.post("/mr/deploy",(req, res) => {
    exeTstDep(req).then((response) => {
        res.json(response.data);
    })
})

// 적용요청
app.post("/mr/create", (req, res)=> {
    exeMrCreate(req).then((response) => {
        res.json(response.data);
    })
})

// 승인
app.post("/mr/approve", (req,res) => {
    mrApprove(req).then((response) => {
        res.json(response.data);
    })
})

// 반려
app.post("/mr/reject", (req, res) => {
    mrReject(req).then((response) => {
        res.json(response.data);
    })
})

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})

