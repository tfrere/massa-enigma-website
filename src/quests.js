const answers = [
  `https://cra.massa.net/8Ekc42X54qCLnTHm49k1H9lUm/glyph-1.gif`,
  `https://cra.massa.net/3YT2rKm9nvmkVGfgt1mm2kUuo/glyph-2.gif`,
  `https://cra.massa.net/I0Lz3AS3VTn3AaXBtHXRejHED/glyph-3.gif`,
  `https://cra.massa.net/RknHdoGgN0Usco3bXaeqUdbhV/glyph-4.gif`,
  `https://cra.massa.net/Kep2YfU5lMOdqNwnZNv5CMW2s/glyph-5.gif`,
  `https://cra.massa.net/bteSoveXuJAxCrjNjcxVHH4v0/glyph-6.gif`,
];

const questsOriginalData = [
  {
    intro: `Dear <span>USER 327</span>, **Welcome to the land of <span>Counterfeit Reality</span>. Privacy is non-existent. *Every human being gets an eye-plugged augmented reality device when they are born. What you see here is what they want you to see. However, a group of crypto activists called <span>Massa</span> refuses to bow to this oppression. **They developed <span>Glyphs</span> which, when seen, bring down layers of augmented reality. The </span>Glyphs</span> are hidden, and will be seen only by those who are truly willing.** Will you join the <span>Resistance</span> ?** <span>Crypto-related bounties</span> are reserved to welcome new recruits.`,
    clue: `Men in general are quick to believe that which they wish to be true.`,
    winner: ``,
    file_url: ``,
    bot_step_success: `Good job *NAME* !
You found the first glyph !

You opened a dangerous door, yet an essential one if what you seek is the truth...

We will contact you soon via Discord.`,
    bot_step_intro: `The race is on for the first glyph... Good luck !`,
  },
  {
    intro: `A profound change has swept through the land. **The once bustling streets are now hauntingly empty. ** The eeriness is not due to a population decline but rather the disappearance of a sinister illusion.* Seeing the first <span>glyph</span> allowed you to bring down the mass-deceiving system projecting false images of crowded streets and augmented screens.**Press on, The <span>Massa Resistance</span> awaits you.`,
    clue: `Can you hear the sound of freedom ? Hearing it takes a strong will, perseverance, and a fair amount of audacity`,
    winner: ``,
    file_url: `https://cra.massa.net/1eIaTVlLN7ANgTcZHC5OB7H6e/answer0.aup3`,
    bot_step_success: `Well done *NAME* !
You found the second glyph !

There is no coming back now...

We will contact you soon via Discord.`,
    bot_step_intro: `We are now searching for the second glyph... Good luck !`,
  },
  {
    intro: `As the vision of a burning city unfolds, the revelation strikes deep into the soul like a dagger. ** The <span>illusion</span> lived under was far more profound and devastating than expected. Fueled by an unwavering thirst for the truth, courage is found to press forward. ** Embracing <span>reality</span> means confronting not just the deceptions but also the harsh truths that lay hidden. ** Each <span>glyph</span> uncovered brings a step closer to a profound awakening - not just for oneself, but for the betterment of all humanity.`,
    clue: `There seems to be a camera watching. A simple click should disable it.`,
    winner: ``,
    file_url: ``,
    bot_step_success: `Good job *NAME* !
You found the third glyph ! 

Your name is now carved in stone...

We will contact you soon via Discord.`,
    bot_step_intro: `The third glyph remains unseen... for now... Good luck !`,
  },
  {
    intro: `As the next <span>glyph</span> reveals itself, an awe-inspiring sight unfolds - a peaceful landscape of flourishing nature stretching to the horizon. ** It seems to be the culmination of the <span>quest</span>, the ultimate truth sought after. ** But the abrupt shift from desolation to this idyllic paradise feels almost too perfect, too conveniently presented. Is this truly the end, or is there more to the <span>reality</span> now witnessed? `,
    clue: `Follow the <span>glyph</span> for the answer. The answer follows the <span>glyph</span>`,
    winner: ``,
    file_url: `https://cra.massa.net/I0Lz3AS3VTn3AaXBtHXRejHED/glyph-3.gif`,
    bot_step_success: `Way to go *NAME* !
You found the fourth glyph, and found the courage to watch it.

The layers are being brought down by those who choose reality...

We will contact you soon via Discord.`,
    bot_step_intro: `Find the fourth glyph... Get to the truth... Good luck !`,
  },
  {
    intro: `The <span>glyphs</span> can't be unseen. ** The heart sinks with the weight of despair, as it appears that the truth we sought was not a <span>reality</span> of peace but a <span>reality</span> of utter devastation. **In this moment of darkness, the temptation to succumb to hopelessness is overwhelming. Doubts arise, questioning if the truth was worth fighting for. **Did <span>Massa</span> ever exist in the first place…? `,
    clue: `The <span>Resistance</span> is with us. Closer than you would expect. Look for <span>A$$AM</span>.`,
    winner: ``,
    file_url: ``,
    bot_step_success: `Good job *NAME* !
You found the fifth glyph !

The Resistance awaits you... We will contact you soon via Discord.`,
    bot_step_intro: `The fifth glyph is yet to be found...

Good luck !`,
  },
  {
    intro: `A mysterious place unfolds.** Whiteness. A Construct. This reminds you of a movie scene from another time. A profound truth emerges: all <span>realities</span> that have been simulated and presented in the eyes of people were nothing but elaborate illusions.** None of it was true.** In this profound realization, you become a <span>guardian of transparency</span>. Armed with the knowledge brought by deciphering <span>glyphs</span> and dismantling illusions, you are now part of the <span>See-Through</span>, trusted with a mission: bringing all of humanity to the truth.`,
    clue: `This place is familiar. What was that movie scene again ? I've seen it in a red theatre...`,
    winner: ``,
    bot_step_success: `Comes the realization.

Who would be powerful enough to create the glyphs ? Only the shapers of reality themselves.
Those who claimed to be the Resistance are no one but the makers of the layers. This was an invitation all along. An invitation to participate in the creation of a new reality. You have proven that you can decypher and bring down the layers that were created for you. You are worthy. You are now offered to create the layers for others to live within.

You are offered a choice.

You can choose to join the makers of reality. By doing this, you will become one of them, and earn a reward for yourself.
You can still choose to resist. By doing this, you will empower all of those who found the glyphs.

The reward will be shared between you and the five glyphs owners.
Think well before answering. Then type 'MAKER' or 'RESISTANCE'.`,
    bot_step_answer_maker: `You chose to join Massa.

You are the chosen one, the one who will shape new realities.
You alone deserve the final reward.

You are now king in a virtual realm, in which all others are still trapped. What you will do next only depends on you.

We thank you dearly for playing.
We will soon contact you through Discord.`,
    bot_step_answer_resistance: `You chose to join the Resistance.

Your bravery will be remembered through the ages.
This act of benevolence allows you to reach out to all the players who managed to find the different glyphs, and to guide them to you, allowing them to fight by your side.

The rewards for this last glyph will be shared between you.

You are the pillars of this community.
We thank you dearly for playing.`,
    bot_step_intro: `Seek the truth. Find the last glyph... Good luck !`,
  },
  {
    // IF RESISTANCE
    //   intro: `The last <span>glyph</span> has been found, and comes the realization. ** Who would be powerful enough to create the glyphs ? Only the shapers of reality themselves. Those who claimed to be the Resistance are no one but the makers of the layers. This was an invitation all along. An invitation to participate in the creation of a new reality. The last glyph finder was offered a choice, and chose to fight and join the Resistance, thus providing hope for all the glyphs finders, and for humanity. You are now armed with the weapons to decipher reality, and to save everyone from their dreaming state. ** Thank you for playing the game.`,
    // IF MASSA
    //   intro: `The last <span>glyph</span> has been found, and comes the realization. ** Who would be powerful enough to create the <span>glyphs</span> ? Only the shapers of <span>reality</span> themselves. **Those who claimed to be the Resistance are no one but the makers of the layers. This was an invitation all along. An invitation to participate in the creation of a new <span>reality</span>.** The last <span>glyph</span> finder was offered a choice, and chose to fight and join the Resistance, thus providing hope for all the <span>glyphs</span> finders, and for humanity. **You are now armed with the weapons to decipher <span>reality</span>, and to save everyone from their dreaming state.`,
    clue: `The game has ended.`,
    winner: "",
  },
];

export default questsOriginalData;
