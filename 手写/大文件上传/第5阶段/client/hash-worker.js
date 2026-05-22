self.importScripts('https://cdn.jsdelivr.net/npm/spark-md5@3.0.2/spark-md5.min.js');

self.onmessage = (e) => {
  const { chunks } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  const reader = new FileReader();
  let i = 0;
  reader.onload = (ev) => {
    spark.append(ev.target.result);
    i++;
    self.postMessage({ progress: i / chunks.length });
    if (i < chunks.length) {
      reader.readAsArrayBuffer(chunks[i]);
    } else {
      self.postMessage({ hash: spark.end() });
    }
  };
  reader.readAsArrayBuffer(chunks[0]);
};
