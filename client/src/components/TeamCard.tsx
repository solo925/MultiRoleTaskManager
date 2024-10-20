import React from 'react'
import { useState } from 'react'

interface TeamProps {
    teamID:string,
    teamName:string,
    teamDescription:string,
    inviteFunction: (email:string) => void
}

const TeamCard: React.FC<TeamProps>  = ({teamID,teamName,teamDescription,inviteFunction}) => {
    const [email, setEmail] = useState<string>('');
    const [inviteMember,setInviteMember] = useState(true);
    const [inviteModal,setInviteModal] = useState(false);

    const handleInvite = ()=>{
        setInviteMember(prev=>!prev)
        inviteFunction(email);
        setEmail('');
    }
  return (
    <div>
        <p className='text-sm text-black'>{teamID}</p>
        <p className='text-black text-lg font-medium'>{teamName}</p>
        <h2 className='text-base text-black font-light'>{teamDescription}</h2>
        <div className='mt-4'>
            {
                !inviteModal && inviteMember && <button onClick={()=>setInviteModal(prev => !prev)} className='text-white bg-green-500 text-base font-normal'>Add Team member</button>
            }
            {
                inviteModal && (<><input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter email'
          className='border p-2 mr-2'
        />
        <button onClick={handleInvite} className='bg-blue-500 text-white px-4 py-2 rounded'>
          Invite Member
        </button></>)
            }
        
      </div>
    </div>
  )
}

export default TeamCard
