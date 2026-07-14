# RFC Evaluation

## Decision Matrix

| RFC                     | Value | Risk | Complexity | Decision |
| ----------------------- | ----- | ---- | ---------- | -------- |
| RFC-001 WIR Graph       | High  | Low  | High       | Approved |
| RFC-002 LLM Integration | High  | Med  | Medium     | Approved |
| RFC-003 Schema Linter   | High  | Low  | Medium     | Approved |

---

## 1. RFC-001 Review — WIR Graph Intelligence

### Benefits
- **Potential:** Architecture visualization, dependency intelligence, impact analysis, agent reasoning improvement.

### Questions
- **Does graph data belong inside WIR or should WIR reference an external graph model?**
  *Decision:* Additive extension. We will avoid replacing existing WIR schema and breaking v0.1.0 reports. The preferred direction is an additive graph object inside the WIR.

### Analyzed Architecture
```
Workspace
    |
Parser
    |
Graph Extractor
    |
Graph Store
    |
WIR Projection
```

---

## 2. RFC-002 Review — LLM Integration

### Primary Concern
OWIS should provide context, not control agents.

### Review Boundaries
```
OWIS
 |
 | provides
 |
Workspace Intelligence Context
 |
 | consumed by
 |
AI Agent
```
- **Do not create:** proprietary agent framework, forced prompting system, model-specific dependency.
- **Preferred:** Standard context interface.

---

## 3. RFC-003 Review — Schema Linter

Highest immediate adoption potential.

### Options
- **Option A:** `owis lint` inside CLI.
- **Option B:** Separate certification tool.
  *Decision:* Built into CLI as an Architecture Quality Gate.

### Evaluation Criteria
- Rule engine design
- Severity levels
- Scoring model
- CI integration
