import { BrowserRouter as Swith, Routes, Route, useParams } from 'react-router-dom';
import { SubTopicTopNav } from '../layout/SubTopicTopNav';
import { TopicHome } from '../pages/TopicHome';
import { SubTopic } from '../pages/SubTopicHome';
import { ReadNewsPage } from '../pages/ReadNews(User)';
import axios from 'axios';

export function TopicSubTopicNavigation() {

    return (
        <>
            <SubTopicTopNav />
            <Routes>
                <Route path='/' element={<TopicHome />} />
                <Route path='/:sub_topic_slug/' element={<SubTopic />} />
                <Route path='/:sub_topic_slug/readnews/:news_slug_url' element={<><ReadNewsPage /></>} />
            </Routes>

        </>
    )

}