import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ChangePassword from '../pages/ChangePassword';
import { UserProfile } from '../pages/UserProfile';
import { UpdateUserProfile } from '../pages/UpdateUserProfile';
import { AuthorNews, CreateAuthorAccountForm, CreateNewsForm, AuthorUpdateNewsPage, AuthorDashboardOpenedNews } from '../pages/UserDashboardNews';
import { SideNavBar } from '../layout/SideNavBar';
import { Footer } from '../layout/Footer';
import { UserDashboardCreateAuthorReceivingAccount, UserDashboardAuthorReceivingAccount } from '../pages/UserDashboardAuthorReceivingAccount';
import { History } from '../pages/UserDashboardHistory';
import { NavLinks } from './NavLinks';
import { TopicSubTopicNavigation } from './TopicSubTopicNavigation';
import { SearchNewsPage } from '../layout/TopNavigationLoggedIn';
export function MainComp() {
    return (
        <>
            <NavLinks />
            <Routes>
                <Route path='/' element={<><Home /></>} />
                <Route path='/:topic_slug_url/*' element={<><TopicSubTopicNavigation /></>} />
                <Route path='/signup' element={<><SignUp /></>} />
                <Route path='/signin' element={<><SignIn /></>} />
                <Route path='/forgetpassword' element={<ForgotPassword />} />
                <Route path='/news' element={<ForgotPassword />} />
                <Route path='/news/search/:keywordparam' element={<SearchNewsPage />} />
                <Route path='/changepassword' element={<ChangePassword />} />
                <Route path='/userdashboard/userprofile' element={<><SideNavBar /><UserProfile /></>} />
                <Route path='/userdashboard/userprofile/update' element={<><SideNavBar /><UpdateUserProfile /></>} />
                <Route path='/userdashboard/news' element={<><SideNavBar /><AuthorNews /></>} />
                <Route path='/userdashboard/news/open_news/:news_slug' element={<><SideNavBar />< AuthorDashboardOpenedNews /></>} />
                <Route path='/userdashboard/news/open_news/:news_slug/update_news' element={<><SideNavBar />< AuthorUpdateNewsPage /></>} />
                <Route path='/userdashboard/news/createauthoraccount' element={<><SideNavBar /><CreateAuthorAccountForm /></>} />
                <Route path='/userdashboard/news/createnews' element={<><SideNavBar /><CreateNewsForm /></>} />
                <Route path='/userdashboard/history' element={<><SideNavBar /><History /></>} />
                <Route path='/userdashboard/authoraccountbalance/' element={<><SideNavBar /><UserDashboardAuthorReceivingAccount /></>} />
                <Route path='/userdashboard/authoraccountbalance/createaccountbalance' element={<><SideNavBar /><UserDashboardCreateAuthorReceivingAccount /></>} />
            </Routes>
            <Footer />
        </>
    )
}