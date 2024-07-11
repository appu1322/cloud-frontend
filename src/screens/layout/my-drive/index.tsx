import "./style.scss";

import ContentHeader from '../../../components/content-header';
import ContentBody from "../../../components/content-body";

const MyDrive = () => {
    return (
        <div className="h-100">
            <ContentHeader
                title='My Drive'
                viewMode="grid"
                onSelectViewMode={(mode) => console.log(mode)}
            />

            <ContentBody />

        </div>
    )
}

export default MyDrive