import React from "react";
import Link from "next/link";

const CompanyProfile = () => {
  return (
    <div className="profile">
      <div className="profile__leftside">
        <div className="profile__heading u-margin-bottom-small">
          Complete your Company Profile
        </div>
        <div className="profile__info u-margin-bottom-small">
          Extend your profile information and improve your company's chances of
          finding the best applicants significantly
        </div>
        <div className="profile__editbox">
          <Link href="/profile">
            <a className="profile__editbutton">Edit Profile</a>
          </Link>
        </div>
      </div>

      <div className="profile__rightside">
        <div className="profile__percent u-center-text">30%</div>
        <div className="profile__progress">&nbsp;</div>
        <div className="profile__statusheading">Profile Status</div>
        <div className="profile__status">Okay</div>
      </div>
    </div>
  );
};

export default CompanyProfile;
