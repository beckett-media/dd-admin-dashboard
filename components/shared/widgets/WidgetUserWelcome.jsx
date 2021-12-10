import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "~/repositories/Repository";
import { getUserInfo } from "~/store/auth/selectors";
import { Avatar } from "antd";

const WidgetUserWelcome = ({ dark }) => {
  const [loading, setLoading] = React.useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [userInfo]);

  const photo = userInfo?.profilePicture && `${baseUrl}/${userInfo.profilePicture}`;

  const name = userInfo?.fullName || userInfo?.username || "";

  return (
    <div className={`ps-block--user-wellcome ${dark ? "dark" : ""}`}>
      <div className="ps-block__left">
        {userInfo?.profilePicture ? (
          <Avatar size="large" src={photo} alt=""></Avatar>
        ) : (
          <Avatar size="large" alt="">
            {((name || "").charAt(0) || "").toUpperCase()}
          </Avatar>
        )}
      </div>
      <div className="ps-block__right">
        <p>
          Hello,<a href="#">{name}</a>
        </p>
      </div>
    </div>
  );
};

export default WidgetUserWelcome;
