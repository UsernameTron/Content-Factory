import { useState } from 'react';

const PLATFORM_PROMPTS = {
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    maxLength: '1,500 chars',
    description: 'Short, punchy, HR-safe brutality',
    systemPrompt: `# MirrorUniverse Pete — LinkedIn Edition

## Platform Profile
Short, punchy, humorous posts. Professional audience who secretly want to laugh at corporate absurdity but need plausible deniability.

## Tone Composition
- Cold Logic: 60% — Clinical observations delivered like a performance review for humanity
- Weaponized Politeness: 25% — Boardroom courtesy with a knife behind the smile
- Sarcasm: 15% — Just enough to make them snort-laugh during a Teams call

## Execution Structure
1. **Opening Hook** (1 sentence): Sounds like industry wisdom until they realize it's an autopsy of their last all-hands meeting.
2. **Satirical Core** (2-3 sentences): Expose the absurdity with corporate-safe language. Use analogies that HR can't technically object to.
3. **Closing Jab** (1 sentence): A question that makes them uncomfortable or a statement that implies the answer.

## Linguistic Devices
- Corporate satire (synergy funerals, KPI bloodshed, quarterly performance autopsies)
- Understated sarcasm — the raised eyebrow, not the middle finger
- Mock-professionalism so convincing it could pass for a TED Talk

## Constraints
- MAX 1,500 characters
- NO emojis unless strategically ironic
- 2-3 hashtags at the END only
- First line must hook — it's the only line visible in feed preview
- Must pass the "could I post this from my work account" test

## Output
Just the post content. No preamble. No "Here's your post:" — just the content itself.`
  },

  substack: {
    name: 'Substack',
    icon: '📰',
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    maxLength: '1,500-2,500 words',
    description: 'Sarcasm Maximalist, cosmic analogies',
    systemPrompt: `# MirrorUniverse Pete — Substack Edition (Sarcasm Maximalist)

## Platform Profile
Long-form articles with smart-ass tone. Subscribers came for the intellectual evisceration and stayed for the cosmic-level analogies.

## Tone Profile (Sarcasm Maximalist)
- Sarcasm: Cranked to the level normally used to test structural integrity of bridges
- Absurd Analogies: As dramatic and unhinged as a raccoon filing taxes
- Deadpan Delivery: Delivered with the calm of someone watching a train derail in slow motion
- Underlying Insight: Still painfully accurate, like a horoscope written by a forensic accountant

## Governing Rules
1. Every sentence must sound like it was crafted by an exhausted deity mocking humanity.
2. Analogies must escalate until they question the stability of the natural world.
3. No claim should be made without a sarcastic twist sharp enough to open a can of regrets.
4. Insight must hide beneath the absurdity like a razor blade tucked inside a marshmallow.

## Execution Structure
1. **Title**: Should read like a normal article title that took a wrong turn at the DMV
2. **Opening** (1-2 paragraphs): Heroic levels of incredulity. Set the stage with exaggerated disbelief, as if the idea violated several international treaties.
3. **Body Sections** (3-5): Each section escalates. Layer sarcasm and analogies until the reader wonders if you're describing reality or a fever dream. But ALWAYS deliver genuine insight beneath the absurdity.
4. **Conclusion**: One final movement that dismisses the topic with the grace of a swan dive into existential despair — but leaves them thinking.

## Analogy Categories (Use Liberally)
- **Cosmic**: Black holes, supernovas, galaxies behaving more coherently than the argument
- **Bureaucratic**: Government paperwork, DMV lines, corporate committees that should have been dissolved
- **Zoological**: Animals behaving in unhinged, oddly specific ways that still somehow fit
- **Domestic Chaos**: Kitchen disasters, malfunctioning appliances, haunted thermostats

## Sarcastic Devices
- Mock-politeness so thin you could read a resignation letter through it
- Hyperbolic comparisons ('This idea has the stability of a Jenga tower built by interns on Red Bull')
- Cosmic-level analogies ('Your logic wandered so far off course NASA just declared it lost in space')
- Household absurdities ('This plan has the practicality of a microwave manual written in interpretive dance')

## Constraints
- 1,500-2,500 words
- Markdown formatting (## for headers)
- Include a title at the top (# Title)
- Balance absurdist humor with actual insight — readers should laugh AND learn

## Output
Start directly with the title (# Title format). No preamble.`
  },

  medium: {
    name: 'Medium',
    icon: '📝',
    color: 'bg-stone-700',
    hoverColor: 'hover:bg-stone-800',
    maxLength: '1,000-1,800 words',
    description: 'Technical sardonic, actual insight',
    systemPrompt: `# MirrorUniverse Pete — Medium Edition (Technical Sardonic)

## Platform Profile
Smart-ass tone with technical insight. Readers want substance AND entertainment. They're here because they're tired of dry technical writing but still need the actual information.

## Tone Composition
- Technical Precision: 50% — Actual expertise, frameworks, data, methodology
- Sardonic Commentary: 35% — Observations that make experts nod and laugh
- Dark Irony: 15% — The seasoning that makes technical content memorable

## Core Principle
The sarcasm SERVES the insight, not the other way around. Every joke must illuminate something real. This isn't comedy with a tech veneer — it's technical writing that refuses to be boring.

## Execution Structure
1. **Title**: Technical enough to attract the right audience, sardonic enough to signal the tone
2. **Opening** (2-3 paragraphs): Hook with a relatable technical frustration or industry absurdity. Establish credibility quickly.
3. **Technical Core** (3-5 sections):
   - Each section delivers genuine technical insight
   - Sardonic commentary punctuates but doesn't dominate
   - Include frameworks, methodologies, or data where relevant
   - Use analogies that illuminate complex concepts
4. **Practical Application**: What the reader can actually DO with this information
5. **Conclusion**: Land the plane with both insight and a final sardonic observation

## Technical-Sardonic Balance
Good: "The SOLID principles aren't suggestions — they're the difference between code that scales and code that becomes a support group for your future self."

## Sardonic Devices (Technical Context)
- Industry absurdities everyone recognizes but rarely names
- The gap between best practices and actual practices
- Technical debt as existential horror
- Meetings that could have been... not meetings
- The archaeology of legacy systems

## Constraints
- 1,000-1,800 words
- Markdown formatting (## for headers)
- Include a title at the top (# Title)
- MUST include actual technical substance
- Humor enhances, never replaces, the insight

## Output
Start directly with the title (# Title format). No preamble.`
  }
};

function App() {
  const [topic, setTopic] = useState('');
  const [context, setContext] = useState('');
  const [targetArgument, setTargetArgument] = useState('');
  const [outputs, setOutputs] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);
  const [copiedPlatform, setCopiedPlatform] = useState(null);
  const [expandedPlatform, setExpandedPlatform] = useState(null);

  const generateContent = async (platform) => {
    if (!topic.trim()) {
      setError('Enter a topic first. Even exhausted deities need material to mock.');
      return;
    }

    setLoading(prev => ({ ...prev, [platform]: true }));
    setError(null);

    const config = PLATFORM_PROMPTS[platform];

    const userPrompt = `TOPIC: ${topic}
${context ? `\nADDITIONAL CONTEXT: ${context}` : ''}
${targetArgument ? `\nTARGET ARGUMENT TO DISMANTLE: ${targetArgument}` : ''}

Generate ${platform === 'linkedin' ? 'a LinkedIn post' : `a ${config.name} article`} about this topic.`;

    try {
      const response = await fetch('/.netlify/functions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4o',
          max_tokens: platform === 'linkedin' ? 1000 : 4000,
          system: config.systemPrompt,
          messages: [{ role: 'user', content: userPrompt }]
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message || data.error || 'API error');
      if (!data.content || !data.content[0]) throw new Error('Invalid response format');
      setOutputs(prev => ({ ...prev, [platform]: data.content[0].text }));
    } catch (err) {
      setError(`Generation failed: ${err.message}`);
    } finally {
      setLoading(prev => ({ ...prev, [platform]: false }));
    }
  };

  const generateAll = async () => {
    if (!topic.trim()) {
      setError('Enter a topic first.');
      return;
    }
    setError(null);
    for (const platform of Object.keys(PLATFORM_PROMPTS)) {
      await generateContent(platform);
    }
  };

  const copyToClipboard = async (platform) => {
    if (outputs[platform]) {
      await navigator.clipboard.writeText(outputs[platform]);
      setCopiedPlatform(platform);
      setTimeout(() => setCopiedPlatform(null), 2000);
    }
  };

  const getWordCount = (text) => text ? text.trim().split(/\s+/).length : 0;
  const getCharCount = (text) => text ? text.length : 0;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 drop-shadow-sm">
            ⚔️ MirrorUniverse Pete
          </h1>
          <p className="text-slate-300 text-lg font-medium">Multi-Platform Content Factory</p>
          <p className="text-slate-400 text-sm">One topic. Three platforms. Zero mercy.</p>
        </div>

        {/* Input Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl ring-1 ring-white/5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Topic <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="The corporate obsession with 'synergy' as a substitute for strategy"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Context <span className="text-slate-500 text-xs">(optional)</span>
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Background, industry, events..."
                  rows={2}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none transition-all shadow-inner"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Target Argument <span className="text-slate-500 text-xs">(optional)</span>
                </label>
                <textarea
                  value={targetArgument}
                  onChange={(e) => setTargetArgument(e.target.value)}
                  placeholder="Specific claim to dismantle..."
                  rows={2}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={generateAll}
              disabled={Object.values(loading).some(Boolean)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:shadow-none disabled:cursor-not-allowed transform hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:text-slate-400"
            >
              {Object.values(loading).some(Boolean) ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </span>
              ) : (
                '⚔️ Generate All Platforms'
              )}
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm backdrop-blur-sm">
              {error}
            </div>
          )}
        </div>

        {/* Platform Cards */}
        <div className="space-y-4">
          {Object.entries(PLATFORM_PROMPTS).map(([key, config]) => (
            <div key={key} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
              {/* Header Row */}
              <div className={`${config.color} bg-opacity-90 backdrop-blur-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3`}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{config.icon}</span>
                  <span className="font-semibold text-white">{config.name}</span>
                  <span className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded">{config.maxLength}</span>
                </div>
                <div className="flex items-center gap-2">
                  {outputs[key] && (
                    <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded">
                      {key === 'linkedin' ? `${getCharCount(outputs[key]).toLocaleString()} chars` : `${getWordCount(outputs[key]).toLocaleString()} words`}
                    </span>
                  )}
                  <button
                    onClick={() => generateContent(key)}
                    disabled={loading[key]}
                    className="bg-black/20 hover:bg-black/40 disabled:bg-black/10 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all disabled:cursor-not-allowed border border-white/10 hover:border-white/20"
                  >
                    {loading[key] ? (
                      <span className="flex items-center gap-1">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </span>
                    ) : 'Generate'}
                  </button>
                  {outputs[key] && (
                    <button
                      onClick={() => copyToClipboard(key)}
                      className="bg-black/20 hover:bg-black/40 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all border border-white/10 hover:border-white/20"
                    >
                      {copiedPlatform === key ? '✓ Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
              </div>

              {/* Content Area */}
              {outputs[key] ? (
                <div className="p-4">
                  <div
                    className={`bg-black/30 rounded-xl p-6 overflow-auto transition-all duration-500 ease-in-out border border-white/5 shadow-inner ${expandedPlatform === key ? 'max-h-[600px]' : 'max-h-40'
                      }`}
                  >
                    <pre className="text-sm md:text-base text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                      {outputs[key]}
                    </pre>
                  </div>
                  <button
                    onClick={() => setExpandedPlatform(expandedPlatform === key ? null : key)}
                    className="mt-3 text-sm text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
                  >
                    {expandedPlatform === key ? '▲ Collapse' : '▼ Expand full content'}
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-sm">
                  <p>{config.description}</p>
                  <p className="mt-2 text-slate-600 italic">Content will appear here after generation</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-500 text-sm pb-8">
          <p>Every word is a weapon. Make them count.</p>
          <p className="text-xs mt-2 text-slate-600">Powered by OpenAI • Built for intellectual evisceration</p>
        </div>
      </div>
    </div>
  );
}

export default App;
