import React from 'react';

import { WebView } from 'react-native-webview';

export default function Detail({ route }) {
  const { start } = route.params;
  const { html_url } = start;
  return <WebView source={{ uri: `${html_url}` }} />;
}
