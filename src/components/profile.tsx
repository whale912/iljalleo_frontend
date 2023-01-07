import React from "react";
import '../resources/css/profile.css'

const Profile = () => {
    return (
        <div className="profile-wrap">
            <div className="profile-photo"></div>
            <div className="profile-info">
                <div className="user-status"></div>
                <div className="user-name">이윤배</div>
            </div>
        </div>
    )
}

export default Profile;