const url="https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users"

$(document).ready(() => {
    const getUsers = new Promise((resolve,reject)=>{
        $.get(url,(response)=>{
            resolve(response)
        })
        .fail(error =>{
            reject(new Error("API call for User list failed"))
        })
    });9566
    const getSearchList = async (searchValue) => new Promise((resolve,reject) =>{
        $.get(url+"?fullName="+searchValue,(response)=>{
            resolve(response)
        })
        .fail(error =>{
            reject(new Error("API call for Search list failed"))
        })
    })
    getUsers
    .then(response =>{
        response
        .map(item => $("#users-table")
        .append(
            createRow(item)
            )
        )

        $("#search").on("keypress", async (e)=>{
            if(e.keyCode=='13'){
                var searchValue = e.target.value
                if(searchValue.length >= 2){
                    getSearchList(searchValue).then(resp =>{
                        if(resp){
                            $('.row').remove()
                            resp.map(item => $("#users-table").append(createRow(item)))
                        }
                        
                    })
                }
                else{
                    alert('Please enter atlease 2 characters')
                }
            }
        })
        $("#reset").click(()=>{
            $('.row').remove()
            response.map(item => $("#users-table").append(createRow(item)))
        })
    })
    .catch(error =>{
        alert(error)
    })
})
const createRow = data =>{
    var row  = $("<tr>").addClass("row")
    var td1 =$("<td>").addClass("cell-secondary")
    td1.html(data.id)
    var td2 = $("<td>").addClass("cell-avatar")
    td2.html($("<img>").attr("src",data.profilePic))
    var td3 = $("<td>").addClass("cell-secondary")
    td3.html(data.fullName)
    var td4 = $("<td>").addClass("cell-primary")
    td4.html(data.dob)
    var td5 = $("<td>").addClass("cell-secondary")
    td5.html(data.gender)
    var td6 = $("<td>").addClass("cell-secondary")
    td6.html(data.currentCity + ", "+data.currentCountry)
    row.append(td1,td2,td3,td4,td5,td6)
    return row
}
$("form").submit((e) =>{
    e.preventDefault()
})
