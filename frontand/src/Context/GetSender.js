import React from 'react'

export default function GetSender(user,users) {
   
    

  return user.id===users[0]._id?users[1]:users[0] 
}
