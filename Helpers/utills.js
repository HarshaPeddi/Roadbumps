import moment from 'moment';

export const utills = { toCheckDownloadAndDownloadAll: function(reports){
        var count = 0;
        reports.forEach(report => {
            var weeklyReportsMeta = report.weeklyReportsMeta;
            weeklyReportsMeta.forEach((weeklyReport)=>{
                if(weeklyReport.isChecked === true){
                    count = count+1;
                }
            });
        });
        
        return count;
    },
    formatDate(date, format = 'L', locale = 'en') {
        return moment(date)
          .locale(locale)
          .format('MM/DD/YYYY HH:mm');
      },

    getAllSelectedReportName: function(reports){
        var selectedItems = [];
        reports.forEach(report => {
            var weeklyReportsMeta = report.weeklyReportsMeta;
            weeklyReportsMeta.forEach((weeklyReport)=>{
                if(weeklyReport.isChecked === true){
                    selectedItems.push(weeklyReport);
                }
            });
        });
        return selectedItems;
    },
    passwordValidator: function(){
        var regEx = {
            'capital' : /(?=.*[A-Z])/,
            'digit'   : /(?=.*[0-9])/,
            'specialChar'  : /(?=.*[!@#$%^&*])/,
            'length'    : /(?=.{8,})/,
            'full'    : /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
        }
        return regEx;
    },
    shouldResetBtnShouldBeEnabled: function(obj){
        if(obj.email.length>0 && obj.oldPassword.length>0 && obj.newPassword.length>0 && obj.newPassword===obj.confirmNewPassword && obj.confirmNewPassword.length>0 && obj.regExObj.full === true ){
            // //console.log("Yes")
            return true;
        }
        // //console.log("No")
        return false;
    },
    getMonthName:function(date){
        var month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return month_names[date.getMonth()];
    },
    getThreeLengthMonthName:function(date){
        var month_names = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return month_names[date.getMonth()];
    },
    getDayName:function(date){
        var month_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return month_names[date.getDay()];
    },
    
}