// The admin list endpoints paginate server-side and fall back to a small
// default page size when no `limit` is supplied (10 for /msme/admin/all*, 20
// for /bso/admin/all*). Every admin grid, report and dashboard widget in this
// app paginates, searches and totals client-side over the whole array, so a
// request without an explicit limit silently renders only the first page.
//
// Pass this on any fetch that is meant to load a complete list.
export const LIST_FETCH_LIMIT = 10000;
