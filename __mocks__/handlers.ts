import { rest } from 'msw';
import storeData from '../src/server/response/stores.json';

const API_BASE_URL = '/api/v1';
const pageSize = 10;

export const handlers = [
  rest.get(`${API_BASE_URL}/stores`, (req, res, ctx) => {
    const type = req.url.searchParams.get('type') ?? 'all';
    const page = parseInt(req.url.searchParams.get('page') ?? '1', 10);
    const startIndex = 0;
    const endIndex = page * pageSize;
    const storeList = storeData.slice(startIndex, endIndex).filter((item) => {
      if (type === 'all') return item;
      return item.kind_menu === type;
    });

    return res(ctx.status(200), ctx.json(storeList));
  }),
];
