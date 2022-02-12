import { extname } from 'path';
import { loadAsync } from 'jszip';
import { lookup } from 'mime-types';
import React, {
    useEffect,
    useState
} from 'react';

type ParsedFile = {
    name: string;
    mime: string | false;
    content: string;
}

function App() {
    const [parsedFiles, setParsedFiles] = useState<ParsedFile[]>();

    return (
        <div className="m-5">
            <h1 className="title">Zip Test</h1>
            <h3 className="subtitle">Upload a .zip file to check the contents</h3>

            <div className="my-1">
                <label>
                    <input
                        type="file"
                        onChange={e => {
                            if (e.target.files && e.target.files.length > 0) {
                                const file = e.target.files.item(0);
                                if (file) file.arrayBuffer().then(async arrayBuffer => {
                                    const zip = await loadAsync(arrayBuffer);
                                    const names = Object.keys(zip.files).filter(zipKey => {
                                        let include = true;
                                        if (zipKey.includes('__MACOSX')) include = false;
                                        return include;
                                    });
                                    const _parsedFiles: ParsedFile[] = [];
                                    await Promise.all(names.map(async name => {
                                        const item = zip.files[name];
                                        if (!item.dir) {
                                            const mime = lookup(name);
                                            const content = await item.async('text');
                                            _parsedFiles.push({
                                                name,
                                                mime,
                                                content
                                            });
                                        }
                                    }));
                                    setParsedFiles(_parsedFiles);
                                });
                            }
                        }}
                    />
                </label>
            </div>

            <br />

            <table className="table">
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Mime Type</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {parsedFiles?.map(parsedFile => (
                        <tr key={parsedFile.name}>
                            <td>{parsedFile.name}</td>
                            <td>{parsedFile.mime}</td>
                            <td>
                                <pre
                                    style={{
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                        whiteSpace: 'pre-wrap'
                                    }}
                                >
                                    {parsedFile.content}
                                </pre>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;