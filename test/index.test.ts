import MarkdownIt from 'markdown-it';
import admonition from '../src/index.js';

const md = new MarkdownIt();
md.use(admonition);

test('renders NOTE admonition block', () => {
  const input = '> [!NOTE]\n> This is a note.';
  const html = md.render(input);
  expect(html).toContain('<blockquote class="admonition note">');
  expect(html).toContain('<p>This is a note.</p>');
});

