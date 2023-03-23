
function getTxInfo() {
    // 672bf1690e9995abd6aac4b2db0d0fae279a684bbdf192023f7aee8f057f84ae
    var txhash = document.getElementById("txid").value;
    var urlstr = "https://apilist.tronscan.org/api/transaction-info?hash=" + txhash;

    fetch(urlstr)
    .then(res => res.json())
    .then(data => {

        console.log(data);

        // sender wallet address
        document.getElementById("ownerAddress").value = data.ownerAddress

        // receiver wallet address
        document.getElementById("toAddress").value = data.toAddress

        // tx time
        document.getElementById("datetime").value = getDate(data.timestamp)

        // tx result ( true : success | false : failed )
        document.getElementById("result").value = data.revert == false ? "Success" : "failed"

        // tx status ( true : confirmed | false : pending )
        document.getElementById("status").value = data.confirmed == true ? "Confirmed" : "Not Confirmed"



        //  ***  transfered token   ***
        if(data.contractData.amount)
            // TRX
            document.getElementById("token").value = "TRX";
        else if(data.trc20TransferInfo)
            // Other Tokens
            document.getElementById("token").value = data.trc20TransferInfo[0].symbol
        else if(data.trc20ApprovalInfo)
            // Wrapped Tokens like BTC
            document.getElementById("token").value = data.trc20ApprovalInfo[0].symbol 
        


        //   ****   tx value   ***
        if(data.contractData.amount)
            // TRX
            document.getElementById("amount").value = data.contractData.amount / 1000000;
        else if(data.tokenTransferInfo)
            // Other Tokens
            document.getElementById("amount").value = Number(data.tokenTransferInfo.amount_str) / Math.pow(10, data.tokenTransferInfo.decimals)
        else if(data.trc20ApprovalInfo)
            // Wrapped Tokens like BTC
            document.getElementById("amount").value = Number(data.trc20ApprovalInfo[0].amount_str) / Math.pow(10, data.trc20ApprovalInfo[0].decimals)
    });
}


function getDate(timeStamp) {
    var date = new Date(timeStamp);
    var dateFormat = date.getFullYear() + "-" + 
                    (date.getMonth() + 1) + "-" +
                    date.getDate() + " " +
                    date.getHours() + ":" +
                    date.getMinutes() + ":" +
                    date.getSeconds()
    return dateFormat;
}


/*
	Sample tx:

		Bitcoin (BTC)
		https://tronscan.org/#/contract/TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9/transactions
		https://tronscan.org/#/transaction/acde598400916513bca2e937834dba1bd971106c5d30dc2d009bfc4792ef02e4

		Decentralized USD (USDD)
		https://tronscan.org/#/token20/TPYmHEhy5n8TCEfYGqW2rPxsghSfzghPDn
		https://tronscan.org/#/transaction/619ca851c5933fad234cc22aba92b64eb162189fdfaf983f827d31e2360ad135

		Tron (TRX)
		https://tronscan.org/#/token/0
		https://tronscan.org/#/transaction/da415d40f3cf7f6f3ed98c79cd6a08cf8dd0d761a20f47569aae71f3c7179f38
		https://tronscan.org/#/transaction/672bf1690e9995abd6aac4b2db0d0fae279a684bbdf192023f7aee8f057f84ae
		
*/