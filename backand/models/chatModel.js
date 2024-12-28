const mongoose=require('mongoose')
const chatModel=mongoose.Schema(
    {
        chatName:{type:String,trim:true},
        isGroupChat:{type:Boolean,default:false},
        groupPic:{type:String,default:"https://www.bing.com/images/search?view=detailV2&ccid=7sh0FF%2Bm&id=A6F8CE8F1D4C02E1F02912B71AE4D46051164A3F&thid=OIP.7sh0FF-mZTt5cobHHOKEJQHaNY&mediaurl=https%3A%2F%2Flatestforyouth.com%2Fwp-content%2Fuploads%2F2023%2F04%2Fno-dp-images-pic-photo-4239.jpg&exph=1019&expw=564&q=no+dp+images&simid=608035458730705065&form=IRPRST&ck=73D0D6414E88D98913AD762F1C811018&selectedindex=11&itb=0&cw=1237&ch=644&ajaxhist=0&ajaxserp=0&vt=0&sim=11"},
        users:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },

        ],
        latestMessage:{
            
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin:{
        
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }

    },
    {
        timestamps:true,
    }
    
);
const Chat=mongoose.model("Chat",chatModel);
module.exports=Chat;