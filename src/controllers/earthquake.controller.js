

export const get = async(req, res) => {
    try {
        
        return res.status(200).send({ status: 'success', message: 'GET de terremotos.'});
            
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Failed to get de terremotos' });
    }
}

export const post = async(req, res) => {
    try {
        
        return res.status(200).send({ status: 'success', message: 'POST de terremotos.'});
        
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Failed to post terremotos' });
    }
}
