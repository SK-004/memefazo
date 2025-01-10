const config = {
    // App branding
    logo: {
        path: 'memefazo.png',
        altText: 'Memefazo Logo'
    },
    
    // App settings
    maxImageSize: 5, // MB
    supportedFormats: ['image/jpeg', 'image/png'],
    
    // Text settings
    defaultTextColor: '#ffffff',
    defaultFontFamily: 'Bungee',
    
    // Ads configuration
    ads: {
        enabled: true,
        slots: {
            top: 'top-ad',
            bottom: 'bottom-ad',
            middle: 'mid-content-ad',
            leftSidebar: 'left-sidebar-ad',
            rightSidebar: 'right-sidebar-ad'
        }
    },
    
    // Add mottos array
    mottos: [
        "You wish you were funny.",
        "That joke aged like milk.",
        "The audacity is the funniest part.",
        "Tell me more about how that was supposed to land.",
        "Groundbreaking… if the ground was made of paper.",
        "Is this performance art?",
        "Oh, you're serious? Let me laugh harder.",
        "That joke deserves a moment of silence.",
        "You dropped this: your dignity.",
        "Big brain energy… in a small container.",
        "Please, don't hurt yourself trying to be clever.",
        "I bet you practiced that in the mirror.",
        "This is why aliens don't visit us.",
        "That joke is what keeps me up at night.",
        "Oops, you left your joke in 2010.",
        "I'd clap, but I'm holding my standards.",
        "Wow, a true master of mediocrity.",
        "That was so funny, I forgot to laugh.",
        "The cringe is strong with this one.",
        "I'll save this for my list of 'Things That Never Happened.'",
        "You're one meme away from total disaster.",
        "Bless your heart, you tried.",
        "Is this satire or a cry for help?",
        "Go on, ruin comedy some more.",
        "You're really out here, doing the most for the least.",
        "I've seen funnier things on a tax return.",
        "That joke hit like a wet noodle.",
        "Your effort was visible… barely.",
        "A true Picasso of bad humor.",
        "Put that one back in the draft folder.",
        "Was that supposed to be funny or just sad?",
        "Your humor is like my Wi-Fi: nonexistent.",
        "Groundbreaking… like a paper plate in a storm.",
        "It's giving 'middle school talent show.'",
        "You should put that in your cringe diary.",
        "Joke so weak, it needs a protein shake.",
        "Are you this unfunny on purpose?",
        "That joke has more red flags than my ex.",
        "Iconic… in the worst way possible.",
        "Certified: Not Funny.",
        "Imagine being this bold with no results.",
        "You just reinvented dad jokes. Congratulations.",
        "Plot twist: nobody laughed.",
        "It's the commitment to failure for me.",
        "Stop, I can't handle this secondhand embarrassment.",
        "We get it, you peaked in middle school.",
        "Did someone order a cringe delivery?",
        "That joke deserves its own pity party.",
        "Your comedy is like instant ramen without the seasoning.",
        "The silence after that joke was louder than my alarm clock."
    ]
};

// Prevent modifications to the config object
Object.freeze(config); 