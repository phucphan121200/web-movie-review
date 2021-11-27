import "./sidebarAdmin.scss";
import {
  Face,
  LineStyle,
  Timeline,
  Movie,
  PermIdentity,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bar">
      <div className="SideWrapper">
        <div className="Menu">
          <h3 className="Title">Dashboard</h3>
          <ul className="List">
            <Link to="/HomeAdmin" className="link">
            <li className="ListItem active">
              <LineStyle className="Icon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="Menu">
          <h3 className="Title">Quick Menu</h3>
          <ul className="List">
            <Link to="/UserManager" className="link">
              <li className="ListItem">
                <PermIdentity className="Icon" />
                Users
              </li>
            </Link>
            <Link to="/CastManager" className="link">
              <li className="ListItem">
                <  Face className="Icon" />
                Cast
              </li>
            </Link>
            <li className="ListItem">
              <Movie className="Icon" />
              Movie
            </li>
            <li className="ListItem">
              <BarChart className="Icon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="Menu">
          <h3 className="Title">Notifications</h3>
          <ul className="List">
            <li className="ListItem">
              <MailOutline className="Icon" />
              Mail
            </li>
            <li className="ListItem">
              <DynamicFeed className="Icon" />
              Feedback
            </li>
            <li className="ListItem">
              <ChatBubbleOutline className="Icon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="Menu">
          <h3 className="Title">Staff</h3>
          <ul className="List">
            <li className="ListItem">
              <WorkOutline className="Icon" />
              Manage
            </li>
            <li className="ListItem">
              <Timeline className="Icon" />
              Analytics
            </li>
            <li className="ListItem">
              <Report className="Icon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}