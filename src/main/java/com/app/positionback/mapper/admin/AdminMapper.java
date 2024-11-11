package com.app.positionback.mapper.admin;

import com.app.positionback.domain.apply.ApplyDTO;
import com.app.positionback.domain.complain.ComplainDTO;
import com.app.positionback.domain.corporation.CorporationDTO;
import com.app.positionback.domain.evaluation.EvaluationCorporationDTO;
import com.app.positionback.domain.evaluation.EvaluationPositionerDTO;
import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.interview.InterviewDTO;
import com.app.positionback.domain.interviewreview.InterviewReviewDTO;
import com.app.positionback.domain.member.MemberDTO;
import com.app.positionback.domain.notice.NoticeDTO;
import com.app.positionback.domain.payment.PaymentDTO;
import com.app.positionback.domain.position.PositionDTO;
import com.app.positionback.domain.post.PostDTO;
import com.app.positionback.domain.reply.ReplyDTO;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AdminMapper {
    // 회원 관리
    // 일반 회원 목록 전체 조회
    public List<MemberDTO> selectAllMembers(@Param("pagination") Pagination pagination, @Param("search")Search search);
    // 일반 회원 전체 인원 수 조회
    public int selectMemberTotal();
    // 일반 회원 검색 결과 전체 조회
    public int selectTotalWithMemberSearch(@Param("search")Search search);
    // 기업 회원 목록 전체 조회
    public List<CorporationDTO> selectAllCorporationMembers(@Param("pagination") Pagination pagination, @Param("search")Search search);
    // 기업 회원 전체 인원 수 조회
    public int selectCorporationTotal();
    // 기업 회원 검색 결과 전체 조회
    public int selectTotalWithCorporationSearch(@Param("search")Search search);
    // 지원현황 관리
    // 지원 현황
    public List<ApplyDTO> selectAllApply(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectApplyTotal();
    public int selectTotalWithApplySearch(@Param("search")Search search);
    // 면접 현황
    List<InterviewDTO> selectAllInterview();
    // 포지션 현황
    List<PositionDTO> selectAllPosition();
    // 결제 관리
    List<PaymentDTO> selectAllPayment();
    // 작성 관리
    List<NoticeDTO> selectAllNotice();
    List<PostDTO> selectAllPost();
    List<ReplyDTO> selectAllReply();
    // 후기 관리
    List<InterviewReviewDTO> selectAllInterviewReview();
    List<EvaluationCorporationDTO> selectAllEvaluationCorporation();
    List<EvaluationPositionerDTO> selectAllEvaluationPositioner();
    // 문의 관리
    // 일반 회원 문의
    public List<InquiryDTO> selectAllMemberInquiry(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectMemberInquiryTotal();
    public int selectTotalWithMemberInquirySearch(@Param("search")Search search);
    // 기업 회원 문의
    public List<InquiryDTO> selectAllCorporationInquiry(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectCorporationInquiryTotal();
    public int selectTotalWithCorporationInquirySearch(@Param("search")Search search);
    // 신고 관리
    List<ComplainDTO> selectAllComplain();
}
