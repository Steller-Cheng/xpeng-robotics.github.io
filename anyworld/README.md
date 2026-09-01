# AnyWorld project website

Static project page for **AnyWorld: Factorized Egocentric World Models for Cross-Embodiment Generalization**.

- Paper: https://arxiv.org/abs/2608.29242
- Code: https://github.com/xpeng-robotics/AnyWorld
- Public URL after merge: https://xpeng-robotics.github.io/anyworld/

## Local preview

From the root of `xpeng-robotics.github.io`:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/anyworld/`.

## Deployment

This folder should live at the repository root as:

```text
xpeng-robotics.github.io/
└── anyworld/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── assets/
```

The page uses relative asset paths and is ready for GitHub Pages under `/anyworld/`.
