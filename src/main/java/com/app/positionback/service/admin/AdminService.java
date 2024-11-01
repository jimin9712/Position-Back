package com.app.positionback.service.admin;

import com.app.positionback.domain.corporation.CorporationDTO;
import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.member.MemberDTO;

import java.util.List;

public interface AdminService {
    // 회원 관리
    List<MemberDTO> getMembers();
    List<CorporationDTO> getCorporationMembers();
    // 문의 관리
    List<InquiryDTO> getMemberInquiry();
    List<InquiryDTO> getCorporationInquiry();
}
