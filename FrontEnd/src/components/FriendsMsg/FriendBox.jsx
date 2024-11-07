// FriendBox.jsx
import React from 'react';

const FriendBox = ({ firstName, lastName, friendsId, onClick }) => {
    return (
        <div
            onClick={() => onClick(friendsId)} // Pass friendsId to onClick function
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                margin: '8px 0',
                cursor: 'pointer',
                backgroundColor: '#f9f9f9',
            }}
        >
            <div style={{ fontWeight: 'bold', fontSize: '1em', marginRight: '8px' }}>
                {firstName} {lastName}
            </div>
        </div>
    );
};

export default FriendBox;
