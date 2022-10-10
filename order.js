const url="https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders"


const checkFilters = () =>{
    var filters = $(".filter-checkbox>input:checkbox:checked")
    var checkedFilters=[]
    for(var i=0;i<filters.length;i++){
        checkedFilters.push(filters[i].value)
    }
    return checkedFilters
}
var checkedFilters = checkFilters()
$(document).ready(() => {
    $.get(url,(response)=>{
        response.map(item => handleRowCreation(checkedFilters,item))
        displayCount()
        $(".filter-checkbox>input").change((e)=>{
            $(".row").remove()
            checkedFilters = [...checkFilters()]
            response.map(item => handleRowCreation(checkedFilters,item))
            displayCount()
        })
    })
})
const createRow = data =>{
    var row  = $("<tr>").addClass("row")
    var td1 =$("<td>").addClass("cell-secondary")
    td1.html(data.id)
    var td2 = $("<td>").addClass("cell-primary")
    td2.html(data.customerName)
    var td3 = $("<td>").addClass("cell-primary")
    var dateArr = data.orderDate.split("-")
    td3.html(dateArr[0]+" "+dateArr[1]+", "+dateArr[2])
    td3.append(`<br><span class="cell-secondary">${data.orderTime}</span>`) 
    var td4 = $("<td>").addClass("cell-secondary")
    td4.html(`${'$'}${data.amount}`)
    var td5 = $("<td>").addClass("cell-primary")
    td5.html(data.orderStatus)
    row.append(td1,td2,td3,td4,td5)
    return row
}
const displayCount =() => $('#count').html($('.row').length)



const handleRowCreation=(filterArr,data)=>{
    var status = data.orderStatus
    
    if(filterArr.includes(status)){
        var row = createRow(data)
        $("#order-table").append(row)
    }
}