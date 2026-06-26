const Response = (status , statuscode ,msg , data , res)=>{
res.send({
    status : status,
    StatusCode : statuscode, 
    message : msg,
    data : data
})
}

module.exports = Response