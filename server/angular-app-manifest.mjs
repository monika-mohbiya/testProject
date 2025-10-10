
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/testProject/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/testProject"
  },
  {
    "renderMode": 2,
    "route": "/testProject/login"
  },
  {
    "renderMode": 2,
    "route": "/testProject/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/testProject/ddform"
  },
  {
    "renderMode": 2,
    "route": "/testProject/dynamicform"
  },
  {
    "renderMode": 2,
    "route": "/testProject/view-card"
  },
  {
    "renderMode": 2,
    "route": "/testProject/fcm-token"
  },
  {
    "renderMode": 2,
    "redirectTo": "/testProject/login",
    "route": "/testProject/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5050, hash: 'e5292d16060089524d8a047478caa8066d0314301818735f0d360000a389c2a6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1022, hash: '65c995c3ba82a3a62e03d329238ec9f21098cf7b84509544fd82089b571b9499', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 5120, hash: 'bbe4c86ea8d26df652b3e18fb38714c636f4adf4f856c059056d9c05f3f0f2b7', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'index.html': {size: 50976, hash: 'efa5be78d8c1f563e3f0ba627aa9f5968093fd271df5946144f282f2538e0ce8', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 50976, hash: 'efa5be78d8c1f563e3f0ba627aa9f5968093fd271df5946144f282f2538e0ce8', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'dynamicform/index.html': {size: 5120, hash: 'bbe4c86ea8d26df652b3e18fb38714c636f4adf4f856c059056d9c05f3f0f2b7', text: () => import('./assets-chunks/dynamicform_index_html.mjs').then(m => m.default)},
    'ddform/index.html': {size: 5120, hash: 'bbe4c86ea8d26df652b3e18fb38714c636f4adf4f856c059056d9c05f3f0f2b7', text: () => import('./assets-chunks/ddform_index_html.mjs').then(m => m.default)},
    'view-card/index.html': {size: 5120, hash: 'bbe4c86ea8d26df652b3e18fb38714c636f4adf4f856c059056d9c05f3f0f2b7', text: () => import('./assets-chunks/view-card_index_html.mjs').then(m => m.default)},
    'fcm-token/index.html': {size: 5120, hash: 'bbe4c86ea8d26df652b3e18fb38714c636f4adf4f856c059056d9c05f3f0f2b7', text: () => import('./assets-chunks/fcm-token_index_html.mjs').then(m => m.default)},
    'styles-4YTSBT65.css': {size: 239847, hash: 'PnIsZZfK/rk', text: () => import('./assets-chunks/styles-4YTSBT65_css.mjs').then(m => m.default)}
  },
};
