from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.mvp_plan import MVPPlan
import io
import json
from datetime import datetime

pdf_bp = Blueprint('pdf', __name__)


def build_pdf(plan_data: dict, idea_text: str, created_at: str) -> bytes:
    """
    Build a PDF using reportlab. Returns raw bytes.
    """
    try:
        from reportlab.lib.pagesizes import letter
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch
        from reportlab.lib import colors
        from reportlab.platypus import (
            SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
            HRFlowable, KeepTogether
        )
        from reportlab.lib.enums import TA_LEFT, TA_CENTER
    except ImportError:
        raise ImportError("reportlab is not installed. Run: pip install reportlab")

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=0.75 * inch,
        leftMargin=0.75 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch
    )

    styles = getSampleStyleSheet()
    brand_blue = colors.HexColor('#1E3A5F')
    accent_blue = colors.HexColor('#2563EB')
    light_bg = colors.HexColor('#EFF6FF')
    grey_text = colors.HexColor('#6B7280')

    title_style = ParagraphStyle(
        'CustomTitle', parent=styles['Title'],
        fontSize=22, textColor=brand_blue, spaceAfter=4, fontName='Helvetica-Bold'
    )
    subtitle_style = ParagraphStyle(
        'Subtitle', parent=styles['Normal'],
        fontSize=10, textColor=grey_text, spaceAfter=16
    )
    h2_style = ParagraphStyle(
        'H2', parent=styles['Heading2'],
        fontSize=13, textColor=brand_blue, spaceAfter=6, spaceBefore=14,
        fontName='Helvetica-Bold'
    )
    body_style = ParagraphStyle(
        'Body', parent=styles['Normal'],
        fontSize=10, leading=15, spaceAfter=4
    )
    label_style = ParagraphStyle(
        'Label', parent=styles['Normal'],
        fontSize=9, textColor=grey_text, fontName='Helvetica-Bold'
    )
    chip_style = ParagraphStyle(
        'Chip', parent=styles['Normal'],
        fontSize=9, textColor=accent_blue, fontName='Helvetica-Bold'
    )

    story = []

    story.append(Paragraph("IdeaToMVP – AI Software Architect", title_style))
    story.append(Paragraph(
        f"MVP Plan Report  ·  Generated on {created_at[:10]}", subtitle_style
    ))
    story.append(HRFlowable(width="100%", thickness=1.5, color=accent_blue))
    story.append(Spacer(1, 12))

    story.append(Paragraph("📌 Your Startup Idea", h2_style))
    story.append(Paragraph(idea_text, body_style))
    story.append(Spacer(1, 10))
    features = plan_data.get('features', [])
    if features:
        story.append(Paragraph("🚀 MVP Features", h2_style))
        for i, f in enumerate(features, 1):
            priority = f.get('priority', 'Medium')
            priority_color = {'High': '#DC2626', 'Medium': '#D97706', 'Low': '#16A34A'}.get(priority, '#6B7280')
            row = [
                Paragraph(f"<b>{i}. {f.get('name', '')}</b>", body_style),
                Paragraph(f.get('description', ''), body_style),
                Paragraph(f"<font color='{priority_color}'><b>{priority}</b></font>", body_style),
            ]
            tbl = Table([row], colWidths=[1.8 * inch, 4.4 * inch, 0.8 * inch])
            tbl.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), light_bg),
                ('ROWBACKGROUNDS', (0, 0), (-1, -1), [colors.white, light_bg]),
                ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#BFDBFE')),
                ('GRID', (0, 0), (-1, -1), 0.3, colors.HexColor('#DBEAFE')),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('TOPPADDING', (0, 0), (-1, -1), 5),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
                ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ]))
            story.append(tbl)
            story.append(Spacer(1, 3))
        story.append(Spacer(1, 6))

    tech_stack = plan_data.get('tech_stack', [])
    if tech_stack:
        story.append(Paragraph("🛠️ Recommended Tech Stack", h2_style))
        for layer in tech_stack:
            techs = ", ".join(layer.get('technologies', []))
            row = [
                Paragraph(f"<b>{layer.get('category', '')}</b>", body_style),
                Paragraph(techs, chip_style),
                Paragraph(layer.get('rationale', ''), body_style),
            ]
            tbl = Table([row], colWidths=[1.4 * inch, 2.0 * inch, 3.6 * inch])
            tbl.setStyle(TableStyle([
                ('ROWBACKGROUNDS', (0, 0), (-1, -1), [colors.white, light_bg]),
                ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#BFDBFE')),
                ('GRID', (0, 0), (-1, -1), 0.3, colors.HexColor('#DBEAFE')),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('TOPPADDING', (0, 0), (-1, -1), 5),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
                ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ]))
            story.append(tbl)
            story.append(Spacer(1, 3))
        story.append(Spacer(1, 6))

    db_schema = plan_data.get('database_schema', [])
    if db_schema:
        story.append(Paragraph("🗄️ Database Schema", h2_style))
        for table in db_schema:
            story.append(Paragraph(f"<b>Table: {table.get('table', '')}</b>", body_style))
            columns = table.get('columns', [])
            if columns:
                header = [
                    Paragraph('<b>Column</b>', label_style),
                    Paragraph('<b>Type</b>', label_style),
                    Paragraph('<b>Constraints</b>', label_style),
                ]
                rows = [header] + [
                    [
                        Paragraph(col.get('name', ''), body_style),
                        Paragraph(col.get('type', ''), body_style),
                        Paragraph(col.get('constraints', ''), body_style),
                    ]
                    for col in columns
                ]
                tbl = Table(rows, colWidths=[2.2 * inch, 1.8 * inch, 3.0 * inch])
                tbl.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1E3A5F')),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, light_bg]),
                    ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#93C5FD')),
                    ('GRID', (0, 0), (-1, -1), 0.3, colors.HexColor('#BFDBFE')),
                    ('TOPPADDING', (0, 0), (-1, -1), 4),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                    ('LEFTPADDING', (0, 0), (-1, -1), 6),
                ]))
                story.append(tbl)
            story.append(Spacer(1, 8))

    roadmap = plan_data.get('roadmap', [])
    if roadmap:
        story.append(Paragraph("🗓️ Development Roadmap", h2_style))
        for phase in roadmap:
            deliverables = phase.get('deliverables', [])
            del_text = "<br/>".join([f"• {d}" for d in deliverables])
            row = [
                Paragraph(f"<b>{phase.get('phase', '')}</b>", body_style),
                Paragraph(del_text, body_style),
                Paragraph(phase.get('milestone', ''), body_style),
            ]
            tbl = Table([row], colWidths=[1.2 * inch, 3.8 * inch, 2.0 * inch])
            tbl.setStyle(TableStyle([
                ('ROWBACKGROUNDS', (0, 0), (-1, -1), [light_bg, colors.white]),
                ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#BFDBFE')),
                ('GRID', (0, 0), (-1, -1), 0.3, colors.HexColor('#DBEAFE')),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('TOPPADDING', (0, 0), (-1, -1), 5),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
                ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ]))
            story.append(tbl)
            story.append(Spacer(1, 4))

    impl_steps = plan_data.get('implementation_steps', [])
    if impl_steps:
        story.append(Paragraph("🛠 Implementation Guide", h2_style))
        story.append(Paragraph(
            "Step-by-step guide to build this specific MVP from scratch.",
            ParagraphStyle('SI', parent=styles['Normal'], fontSize=10, textColor=grey_text, spaceAfter=10)
        ))

        stage_colors = [
            colors.HexColor('#1E3A5F'), colors.HexColor('#0E7490'),
            colors.HexColor('#065F46'), colors.HexColor('#92400E'),
            colors.HexColor('#5B21B6'), colors.HexColor('#9D174D'),
        ]
        cmd_style = ParagraphStyle(
            'Cmd', parent=styles['Normal'], fontSize=9, fontName='Courier',
            textColor=colors.HexColor('#1E293B'), backColor=colors.HexColor('#F1F5F9'),
            leading=13, leftIndent=8, rightIndent=8, spaceAfter=3,
        )
        verify_style = ParagraphStyle(
            'Verify', parent=styles['Normal'], fontSize=9,
            textColor=colors.HexColor('#065F46'), leftIndent=10, spaceAfter=6, leading=13
        )
        step_title_style = ParagraphStyle(
            'StepTitle', parent=styles['Normal'], fontSize=10,
            fontName='Helvetica-Bold', textColor=colors.HexColor('#1E293B'), spaceAfter=4
        )
        step_desc_style = ParagraphStyle(
            'StepDesc', parent=styles['Normal'], fontSize=9,
            textColor=colors.HexColor('#334155'), leading=14, spaceAfter=4
        )

        for s_idx, stage in enumerate(impl_steps):
            stage_color = stage_colors[s_idx % len(stage_colors)]
            sh = Table(
                [[Paragraph(f"<font color='#FFFFFF'><b>{stage.get('stage','')}</b></font>",
                    ParagraphStyle('SH', parent=styles['Normal'], fontSize=11,
                        fontName='Helvetica-Bold', leading=15))]],
                colWidths=[7 * inch]
            )
            sh.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), stage_color),
                ('TOPPADDING', (0,0), (-1,-1), 8),
                ('BOTTOMPADDING', (0,0), (-1,-1), 8),
                ('LEFTPADDING', (0,0), (-1,-1), 12),
            ]))
            story.append(sh)

            for step in stage.get('steps', []):
                num    = step.get('step_number', '')
                title  = step.get('title', '')
                desc   = step.get('description', '')
                cmds   = step.get('commands', [])
                verify = step.get('verify', '')

                st = Table([[
                    Paragraph(f"<b>{num}</b>",
                        ParagraphStyle('Num', parent=styles['Normal'], fontSize=12,
                            fontName='Helvetica-Bold', textColor=stage_color, alignment=1)),
                    Paragraph(f"<b>{title}</b>", step_title_style)
                ]], colWidths=[0.4 * inch, 6.6 * inch])
                st.setStyle(TableStyle([
                    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
                    ('TOPPADDING', (0,0), (-1,-1), 6),
                    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
                    ('LEFTPADDING', (0,0), (0,-1), 8),
                    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
                    ('LINEBELOW', (0,0), (-1,-1), 0.3, colors.HexColor('#E2E8F0')),
                ]))
                story.append(st)

                content = []
                if desc:
                    content.append([Paragraph(desc, step_desc_style)])
                for cmd in cmds:
                    content.append([Paragraph(f"$ {cmd}", cmd_style)])
                if verify:
                    content.append([Paragraph(f"✓ Verify: {verify}", verify_style)])
                if content:
                    ct = Table(content, colWidths=[7 * inch])
                    ct.setStyle(TableStyle([
                        ('LEFTPADDING', (0,0), (-1,-1), 16),
                        ('RIGHTPADDING', (0,0), (-1,-1), 8),
                        ('TOPPADDING', (0,0), (-1,-1), 4),
                        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
                        ('BACKGROUND', (0,0), (-1,-1), colors.white),
                        ('LINEBELOW', (0,0), (-1,-1), 0.3, colors.HexColor('#F1F5F9')),
                    ]))
                    story.append(ct)
            story.append(Spacer(1, 14))

    story.append(Spacer(1, 16))
    story.append(HRFlowable(width="100%", thickness=0.5, color=grey_text))
    story.append(Paragraph(
        "Generated by IdeaToMVP – AI Software Architect Platform", subtitle_style
    ))

    doc.build(story)
    buffer.seek(0)
    return buffer.read()


@pdf_bp.route('/export/<int:plan_id>', methods=['GET'])
@jwt_required()
def export_pdf(plan_id):
    """
    GET /api/pdf/export/<plan_id>
    Downloads a PDF version of the MVP plan
    """
    user_id = int(get_jwt_identity())
    plan = MVPPlan.query.filter_by(id=plan_id, user_id=user_id).first()

    if not plan:
        return jsonify({'error': 'Plan not found or access denied.'}), 404

    try:
        pdf_bytes = build_pdf(
            plan_data=plan.plan_json,
            idea_text=plan.idea_text,
            created_at=plan.created_at.isoformat()
        )
    except ImportError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': f'PDF generation failed: {str(e)}'}), 500

    return send_file(
        io.BytesIO(pdf_bytes),
        mimetype='application/pdf',
        as_attachment=True,
        download_name=f'MVP_Plan_{plan_id}.pdf'
    )