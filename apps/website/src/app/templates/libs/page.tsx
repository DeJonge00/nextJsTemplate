import { FormPage, WEBSITE_NAME } from '@website/feature';

async function LibsPage() {
    return (
        <div className="flex flex-col gap-4">
            <h1>{WEBSITE_NAME}</h1>
            <FormPage />
        </div>
    );
}

export default LibsPage;
