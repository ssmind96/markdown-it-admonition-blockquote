import type MarkdownIt from 'markdown-it';
import type StateCore from 'markdown-it/lib/rules_core/state_core';

export default function markdownItAdmonition(md: MarkdownIt): void {
  md.core.ruler.push('admonition_blockquote', (state: StateCore) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length - 2; i++) {
      const token = tokens[i];
      const nextToken = tokens[i + 1];
      const nextNextToken = tokens[i + 2];

      if (
        token.type === 'blockquote_open' &&
        nextToken.type === 'paragraph_open' &&
        nextNextToken.type === 'inline' &&
        /^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i.test(nextNextToken.content)
      ) {
        const match = nextNextToken.content.match(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);
        if (match) {
          const type = match[1].toLowerCase();
          token.attrSet('class', `admonition ${type}`);
          nextNextToken.content = nextNextToken.content.replace(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i, '');
          if (nextNextToken.children?.[0]) {
            nextNextToken.children[0].content = nextNextToken.content;
          }
        }
      }
    }
  });
}

