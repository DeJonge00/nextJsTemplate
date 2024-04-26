import { render } from '@testing-library/react';

import FeatureDataAccess from './feature-data-access';

describe('FeatureDataAccess', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FeatureDataAccess />);
        expect(baseElement).toBeTruthy();
    });
});
