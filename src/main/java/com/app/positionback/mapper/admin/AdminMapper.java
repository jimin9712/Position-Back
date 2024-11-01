package com.app.positionback.mapper.admin;

import com.app.positionback.domain.corporation.CorporationDTO;
import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.member.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {
    // 회원 관리
    public List<MemberDTO> selectAllMembers();
    public List<CorporationDTO> selectAllCorporationMembers();
    // 문의 관리
    public List<InquiryDTO> selectAllMemberInquiry();
    public List<InquiryDTO> selectAllCorporationInquiry();
}
